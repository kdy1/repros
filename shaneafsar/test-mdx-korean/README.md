This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## To reproduce issue

* Run `npm run build`
* Notice the output (build failed)

```
   Collecting page data ..SyntaxError: Unexpected token '한', ..."his),\": \한\\uAD6D\\"... is not valid JSON
    at JSON.parse (<anonymous>)
    at 6560 (/Users/shaneafsar/workspace/test-mdx-korean/.next/server/app/[...slug]/page.js:1:2492)
    at Function.t (/Users/shaneafsar/workspace/test-mdx-korean/.next/server/webpack-runtime.js:1:127)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async collectGenerateParams (/Users/shaneafsar/workspace/test-mdx-korean/node_modules/next/dist/build/utils.js:859:17)
```

## Expected result
* Downgrade to 13.4.11 via `npm install next@13.4.11`
* Run `npm run build`
* Notice successful build 
