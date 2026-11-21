## **مثال بسيط**
```
عملت جراج وده ال context
عملت سور على الجراج وده شكل الكونتكست او نوع البيانات بال typescript
مين الناس اللي تقدر تقف في الجراج ده وده ال provider
الباب اللي يدخل او يخرج منه العربيات وده ال useContext
زي بالظبط جراج تحت عمارة
```

بص، التلاتة دول بيكملوا بعض، وكل واحد ليه وظيفة مختلفة:

### **1. createContext**

**بعمل مكان أقدر أشارك فيه الداتا بين الـ Components.**

```
const dataContext = createContext()
```

يعني بجهز قناة لمشاركة البيانات.

### **2. Provider**

**بحط الداتا في المكان اللي أنشأته، وبحدد مين يقدر يوصلها.**

```
<dataContext.Provider value="Ahmed">
  <App />
</dataContext.Provider>
```

يعني بقول لأي Component داخل App: تقدر تستخدم الداتا اللي أنا بعتها.

### **3. useContext**

**باستخدمه علشان أستقبل الداتا في أي Component داخل Provider.**

```
const data = useContext(dataContext)
```

هنا `data` هتكون `"Ahmed"`.

### **تخيلها بالطريقة دي:**

**createContext**

بعمل قناة للداتا

**Provider**

بحط الداتا في القناة وبوزعها

**useContext**

باستقبل الداتا من القناة

**احفظ الجملة دي:**

- `createContext` = إنشاء.
- `Provider` = توفير ومشاركة.
- `useContext` = استقبال واستخدام.

يعني بدل ما تبعت الداتا من Component للتاني باستخدام Props، بتشاركها عن طريق Context. 👌

# ================================================
//! مهم جدا لفهم ال contxt api الطريقة البسيطة والطريقة الجديدة

```
 //! link of chat : https://chatgpt.com/s/t_6b01fdde0b9c819195b3f39b99321766
```

```
بص، الطريقتين في الأساس بيستخدموا نفس الفكرة بالضبط: **React Context API**، لكن الاختلاف في طريقة تنظيم الكود، وإدارة الـ State، وطريقة توزيع الـ Context على مكونات التطبيق.

والطريقة الثانية تعتبر تنظيمًا أفضل للمشاريع الكبيرة، خصوصًا لما تستخدم TypeScript.

خلينا نفهم الموضوع واحدة واحدة، وبالذات الـ `Provider` في الطريقة الثانية.

# **1. نفهم الطريقة الأولى**

عندك في الملف الأول:

```
export const dataContext = createContext()
```

هنا أنت أنشأت Context اسمه `dataContext`.

بعد كده:

```
const [data, setData] = useState("data ContextA")
```

أنت أنشأت State عادية جدًا.

وبعدين:

```
<dataContext.Provider value={data}>
  <ContextD />
  <ContextB />
</dataContext.Provider>
```

هنا أهم نقطة.

أنت بتقول لـ React:

أي Component موجود داخل `dataContext.Provider` يقدر يوصل للقيمة اللي أنا بعتها في `value`.

يعني كأنك بتوزع الداتا على كل المكونات الموجودة داخل الـ Provider.

**طيب ContextD استقبل الداتا إزاي؟**

```
const data2 = useContext(dataContext)
```

هنا `useContext` بتدور على أقرب Provider فوق الـ Component الحالي، واللي بيستخدم نفس الـ Context.

وبترجع القيمة الموجودة في `value`.

يعني:

```
value={data}
```

تساوي:

```
const data2 = useContext(dataContext)
```

والنتيجة:

```
data ContextA
```

**شكل الطريقة الأولى**

**ContextA**

فيه الـ State والـ Provider

**dataContext.Provider**

value = data

**ContextB**

**ContextD**

useContext

# **2. نفهم الطريقة الثانية**

هنا أنت قسمت الكود إلى ملفين، وده أول اختلاف.

**الملف الأول: AuthContext.ts**

```
import { createContext, useContext } from "react";

interface AuthContext {
  userName: string | null,
  token: string | null,
  login: (userName: string, token: string) => void
}

export const authContext = createContext<AuthContext | null>(null)

export const useAuth = () => useContext(authContext)
```

خلينا نفهم كل جزء.

### **أولًا: interface AuthContext**

```
interface AuthContext {
  userName: string | null,
  token: string | null,
  login: (userName: string, token: string) => void
}
```

ده TypeScript.

أنت بتحدد شكل الداتا اللي المفروض الـ Context يستقبلها.

يعني بتقول إن الـ Context هيكون فيه:

- `userName`: اسم المستخدم، وممكن يكون `null`.
- `token`: التوكن، وممكن يكون `null`.
- `login`: Function بتستقبل اسم المستخدم والتوكن ومش بترجع قيمة.

بمعنى آخر، أنت بتحدد العقد أو الشكل المتوقع للداتا قبل استخدامها.

### **ثانيًا: createContext**

```
export const authContext = createContext<AuthContext | null>(null)
```

ركز هنا شوية.

أنت بتقول لـ TypeScript:

القيمة اللي هتتحط في الـ Context لازم تكون من النوع `AuthContext` أو `null`.

ليه حطينا `null`؟

لأنك بتدي قيمة ابتدائية للـ Context وهي:

```
null
```

لكن لما نستخدم Provider بعد كده، هنمرر القيمة الحقيقية.

### **ثالثًا: useAuth**

```
export const useAuth = () => useContext(authContext)
```

دي حاجة مهمة جدًا في الطريقة الثانية.

بدل ما كل Component يكتب:

```
const auth = useContext(authContext)
```

أنت عملت Custom Hook اسمه `useAuth`.

فأي Component محتاج بيانات المستخدم يقدر يكتب:

```
const auth = useAuth()
```

وده اسمه Custom Hook.

# **3. نخش على أهم جزء: AuthProvider**

ده الملف التاني:

```
import { useState, type FC, type PropsWithChildren } from "react"
import { authContext } from './AuthContext'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [userName, setUserName] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  const login = (userName: string, token: string) => {
    setUserName(userName)
    setToken(token)
  }

  return (
    <authContext.Provider value={{ userName, token, login }}>
      {children}
    </authContext.Provider>
  )
}

export default AuthProvider
```

خلينا نفك الموضوع.

### **أول سؤال: هو AuthProvider ده إيه أصلًا؟**

ده Component عادي أنت اللي عملته.

مش حاجة موجودة جاهزة في React.

أنت سميته `AuthProvider` لأنه مسؤول عن توفير بيانات الـ Authentication لباقي التطبيق.

يعني هو المسؤول عن:

1. تخزين اسم المستخدم.
2. تخزين الـ Token.
3. توفير Function اسمها login.
4. توزيع كل البيانات دي على المكونات الموجودة داخله.

### **ثاني سؤال: يعني إيه PropsWithChildren؟**

```
const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
```

هنا أنت بتقول إن `AuthProvider` Component بيستقبل `children`.

طيب يعني إيه children؟

افترض إنك كتبت:

```
<AuthProvider>
  <App />
</AuthProvider>
```

هنا:

```
children = <App />
```

يعني أي Component تحطه بين بداية ونهاية `AuthProvider` هيكون هو الـ children.

و`PropsWithChildren` دي Type جاهزة من React بتضيف خاصية `children` للـ Props.

أما `FC` فهي اختصار `FunctionComponent`، وبتحدد نوع الـ Component.

### **ثالث سؤال: إيه الفرق بين AuthProvider و authContext.Provider؟**

دي أهم نقطة في الموضوع كله.

عندك حاجتين مختلفتين:

| العنصر                 | وظيفته                                                   |
| ---------------------- | -------------------------------------------------------- |
| `authContext`          | إنشاء الـ Context نفسه                                   |
| `authContext.Provider` | توفير القيمة للمكونات الموجودة داخله                     |
| `AuthProvider`         | Component أنت أنشأته لتنظيم الـ State وتوفير الـ Context |

يعني `AuthProvider` عبارة عن غلاف (Wrapper) أنت عملته، وجواه الـ Provider الأصلي بتاع React.

شوف العلاقة:

**AuthProvider**

Component أنت عملته

**authContext.Provider**

React Provider الأصلي

**{children}**

كل التطبيق أو المكونات اللي وضعتها داخله

### **رابع سؤال: ليه كتبنا value بالشكل ده؟**

```
value={{ userName, token, login }}
```

هنا أنت مش بتبعت قيمة واحدة زي الطريقة الأولى.

أنت بتبعت Object كامل فيه 3 حاجات:

```
{
  userName: userName,
  token: token,
  login: login
}
```

وده معناه إن أي Component داخل الـ Provider يقدر يستخدم التلاتة.

مثلًا:

```
const auth = useAuth()

console.log(auth?.userName)
console.log(auth?.token)
```

ويقدر كمان ينفذ:

```
auth?.login("Ahmed", "123456")
```

لما تنفذ `login`، الـ State بتتغير، وReact بيعمل Re-render للمكونات اللي بتستخدم القيمة المتغيرة.

# **4. إزاي بنستخدم AuthProvider في التطبيق؟**

دي خطوة مهمة جدًا، وهي اللي بتربط كل الكلام ببعضه.

في ملف `main.tsx` مثلًا:

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from './AuthProvider'

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
```

إيه اللي حصل هنا؟

أنت حطيت التطبيق كله داخل `AuthProvider`.

وبالتالي كل المكونات الموجودة داخل App تقدر تستخدم بيانات الـ Context.

مثلًا:

```
import { useAuth } from './AuthContext'

const Profile = () => {
  const auth = useAuth()

  return (
    <div>
      <h1>{auth?.userName}</h1>
      <h2>{auth?.token}</h2>

      <button onClick={() => auth?.login("Ahmed", "123456")}>
        Login
      </button>
    </div>
  )
}

export default Profile
```

لاحظ إنك مش محتاج تبعت Props من App إلى Profile ولا من Component للتاني.

الـ Context بيوفر لك الوصول المباشر للقيم طالما المكون موجود داخل الـ Provider.

# **5. مقارنة الطريقتين**

| المقارنة           | الطريقة الأولى  | الطريقة الثانية       |
| ------------------ | --------------- | --------------------- |
| إنشاء Context      | موجود           | موجود                 |
| مكان الـ State     | داخل نفس الملف  | داخل Provider منفصل   |
| توزيع البيانات     | Provider مباشرة | Provider داخل Wrapper |
| الوصول للداتا      | useContext      | Custom Hook           |
| TypeScript         | مش مستخدم       | مستخدم                |
| تنظيم المشروع      | بسيط            | أفضل للمشاريع الكبيرة |
| توزيع أكثر من قيمة | ممكن            | سهل باستخدام Object   |

# **6. أهم حاجة عايزك تخرج بيها**

احفظ التسلسل ده:

**1. createContext**

بنشئ مكان لمشاركة البيانات

**2. AuthProvider**

بنشئ State و Functions

**3. authContext.Provider**

بوزع البيانات عن طريق value

**4. useAuth**

بستقبل البيانات في أي Component

**ملحوظة مهمة جدًا:** في الطريقة الثانية، الأفضل إنك تعدل `useAuth` بالشكل ده:

```
export const useAuth = () => {
  const context = useContext(authContext)

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    )
  }

  return context
}
```

ليه؟

لأنك لو استخدمت `useAuth` في Component مش موجود داخل `AuthProvider`، هتاخد رسالة واضحة بدل ما تفضل تتعامل مع `null` واحتمال ظهور أخطاء بعد كده.

# **7. اختبر فهمك بسؤالين**

**السؤال 1: هل AuthProvider موجود جاهز في React؟**

أيوه، React بتوفره

لأ، إحنا بنعمله بنفسنا

هو نفسه createContext

**إجابة صحيحة ✓**

AuthProvider اسم Component أنت أنشأته، أما authContext.Provider فهو Provider الخاص بـ React.

**السؤال 2: إيه اللي بيحدد المكونات اللي تقدر توصل للداتا؟**

اسم الـ Context

المكونات الموجودة داخل Provider

ملف App.tsx فقط

**إجابة صحيحة ✓**

أي Component داخل نطاق Provider يقدر يوصل لقيمته، حتى لو كان متداخلًا داخل مكونات أخرى.

لو فهمت الفرق بين `AuthProvider` و`authContext.Provider` تحديدًا، فأنت كده فهمت أهم جزء في الطريقة الثانية.
```
*


