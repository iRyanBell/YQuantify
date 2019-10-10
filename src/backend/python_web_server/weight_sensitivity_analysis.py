#  from __future__ import absolute_import
import pandas as pd
import numpy as np
import sys
# #fit the model
from statsmodels.tsa.vector_ar.var_model import VAR
import sys
import warnings
warnings.filterwarnings("ignore")

# #############################################
# # Input parameters
# #############################################
SENSITIVITY_RATIO = 0.3

df = pd.read_csv('./routes/data/weight.csv')
# df = pd.read_csv('./data/weight.csv')
##############################################
# DATA EXPLORATION
##############################################
df['Date'] = pd.to_datetime(df['Date'])
df.set_index('Date', inplace=True)

columns=['Sleep', 'Exercise', 'Calories','Weight']
df_data = df.copy()
df_data = df_data[columns]


##############################################
# Data manupulation for NAN value
##############################################
cols = df_data.columns

nan_columns = df_data.isnull().any()
nan_true = [i for i, col_i in enumerate(nan_columns) if col_i == True]

#Should be forloop
for nan_i in nan_true:
    column_name = nan_columns.index[nan_i]
    s = pd.Series(df_data[column_name])
    df_data[column_name] = s.interpolate(method='nearest')


##############################################
#  ARIMA
#  ARIMA stands for Auto-Regressive Integrated Moving Average.
##############################################

Y = df_data['Weight']
X = df_data.drop(['Weight'], axis=1)

#creating the train and validation set
train = df_data[:-1]
test = df_data[-1:]

model = VAR(endog=train)
model_fit = model.fit()

# make prediction on validation
prediction = model_fit.forecast(model_fit.y, steps=1)

#make final predictions
model = VAR(endog=train)
model_fit = model.fit()
yhat = model_fit.forecast(model_fit.y, steps=2)

# # plt.figure()
# # plt.plot(train.index.values, train.Weight.values, 'b.', markersize=10, label='Observations')
# # plt.plot(model_fit.fittedvalues.index.values, model_fit.fittedvalues['Weight'], 'r-')
# # plt.show()

##############################################
#  Sensitivity
##############################################
def sensitivity(df, col_name, ratio, percentage=0.9):
    # print(col_name)
    avg_data = df_data_sen.mean()
    # df_data_sen[col_name]
    df_data_sen[col_name].iloc[-2]= df_data_sen[col_name].iloc[-2] * ratio

    train = df_data_sen[:-1]
    test = df_data_sen[-1:]

    model_sen = VAR(endog=train)
    model_sen_fit = model_sen.fit()

    # make prediction on validation
    yhat_sen_cal = model_sen_fit.forecast(model_sen_fit.y, steps=2)
    return yhat_sen_cal[:,3][-1]


col_names_sensitivity = {'Sleep':1+SENSITIVITY_RATIO, 'Exercise':1+SENSITIVITY_RATIO, 'Calories':1-SENSITIVITY_RATIO}

weight_pred = []
weight_diff = []
for col_i, direction in col_names_sensitivity.items():
    df_data_sen = df_data.copy()
    res = sensitivity(df_data_sen, col_i, direction, percentage=0.1)
    weight_pred.append(res)
    weight_diff.append(yhat[1,3] - res)


#FINAL RESULT
df_sen = pd.DataFrame()
df_sen['attr'] = col_names_sensitivity.keys()
df_sen['weight_pred'] = weight_pred
df_sen['sensitivity'] = np.array(weight_diff) * -1

# import seaborn as sns
# sns.set(style="whitegrid")
# ax = sns.barplot(x="attr", y="sensitivity", data=df_sen)
# plt.show()

col_names = list(col_names_sensitivity.keys())
# print(X.index.values)
# print(X[col_names[0]].values)
# print(X[col_names[1]].values)
# print(X[col_names[2]].values)
# print(Y.values)
# print(df_sen['sensitivity'].values)
print(df_sen.to_json())
# res = {'a': [1, 2, 3]}
# print(str(res))

sys.stdout.flush()