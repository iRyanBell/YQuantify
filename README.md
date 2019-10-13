# Quantify. Train. Improve.

<p align="center">
	<img src="https://www.yquantify.com/yquantify_logo_light.png" width="256" height="291" alt="YQuantify Logo" />
</p>

When you're trying to reach a goal, it can be challenging to figure out which collection of actions are working toward or against your future progress. The power of YQuantify is to find and illuminate these associations using a flexible machine learning pipeline.

As the platform learns more about you, it is able to discover more connections to produce better recommendations. Quantify your actions, process your data, then make improvements using your unique and evolving model's predictions.

---

## Getting Started

**To begin using YQuantify:**

1. **Sign Up** using the **Create Account** button from the navigation bar.
2. Check your email inbox for a message from YQuantify with the subject line **Welcome to YQuantify!**
3. Click the **Confirm Email** button inside the email body.
4. Choose a unique username for your account.
5. **You're in!**

## Using the dashboard

**Adding data to your dashboard:**

1. Click the **New Entry** button from the nav bar.
2. Select a feature from the dropdown menu, then enter a numeric value.
3. Click the **Add** button.
4. To remove values, use the **Edit List** button from the upper-right corner of a feature section.

## Performing an analysis

**Calculate your weight-sensitivity analysis:**

1. Log at least 5 full days of data (exercise, sleep, and calories).
2. Click the **Refresh** button.

---

## How it works

Sensivity analysis uses taylor series expansion. Let's say the prediction model from the multi-variate regression is <img width="49" alt="math_01" src="https://user-images.githubusercontent.com/25379378/66709175-07a62000-ed13-11e9-9571-160b6bf1f66e.png">

<img width="599" alt="math_02" src="https://user-images.githubusercontent.com/25379378/66709176-0a087a00-ed13-11e9-8033-d762b690a108.png">

When δx is small, we can neglect the high order terms, and define the first or higher order of approximated functions. In here, we only consider the first order model, which is a linear model.

<img width="680" alt="math_03" src="https://user-images.githubusercontent.com/25379378/66709178-0c6ad400-ed13-11e9-95c8-3a9fd9bf8355.png">

From the Taylor series expansion, we can get the gradient information.

<img width="260" alt="math_04" src="https://user-images.githubusercontent.com/25379378/66709179-0e349780-ed13-11e9-8bb6-0accc0dbb604.png">

This gradient can be computed numerically through the small perturbation. <img width="29" alt="math_05" src="https://user-images.githubusercontent.com/25379378/66709180-0f65c480-ed13-11e9-94b8-8b9e0689fffb.png">

---

## Dashboard view

![Dashboard analysis](https://user-images.githubusercontent.com/25379378/66709033-6ae28300-ed10-11e9-822f-18d3cb673627.jpg)

---

**Install dependencies**

```bash
npm install
```

**Check linting**

```bash
npm run lint
```

**Start React development server**

```bash
npm run dev
```

**Build front-end static site**

```bash
npm run build
```

**Start back-end Express server**

```bash
npm start
```
