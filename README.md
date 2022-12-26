# Multi-Layer Testing

Using a combination of isolation and behavioral tests is a great way to improve your development workflow. I have adopted a strategy that utilizes both [Storybook](https://storybook.js.org/) for isolation (sandbox) testing and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for behavior driven testing.

This project demonstrates how you can apply shared techniques and utilities to both libraries to achieve the similar results without additional configuration or tools.

This project utilizes [Mock Service Worker](https://mswjs.io/) and it's [Storybook add-on](https://storybook.js.org/addons/msw-storybook-addon) to mock XHR requests for both Storybook and in [Jest](https://mswjs.io/docs/getting-started/integrate/node).

From there we leverage similarities between Storybook and React Testing Libraries to acheive the same results.

## Managing Invariant Violations

For this library, I used [React Query](https://react-query-v3.tanstack.com/) which I really enjoy for it's requisition paradigms.

This library uses [`Context`](https://reactjs.org/docs/context.html) in a way you'd see a lot with routers or state managers. Typically anything involved with Application Networking sits high up in your app architecture or even synchronizes externally.

In `react-query` caches request using a `QueryClient` instance which is provided as the `client` property for the `QueryClientProvider`.

```js
const queryClient = new QueryClient();

// ...

<QueryClientProvicer client={queryClient} />;
```

This is great because then we can just use queries wherever but it's also a problem because we require the instance of the `QueryClient` whenever we render components using it as context.

Avoiding to use this instance creates an Invariant Violation, meaning we need a `Provider` to supply our components with the needed context. Luckily, I am going to show you how I solve for both Storybook and React Testing Library

### Storybook Decorators

[Decorators](https://storybook.js.org/docs/react/writing-stories/decorators) give authors the ability to wrap stories with additional dependencies. In most cases, I find this to be a convenient way to mock context.

These decorators wrap the Story function and supply the needed context.

**Note:** I like to create a new `QueryClient` each time the Story renders so I can work with a clean cache each time.

```js
// .storybook/preview.js

const queryClientDecorator = (
    Story,
    {
        parameters: {
            queryClient = new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: Infinity,
                        retry: false,
                    },
                },
            }),
        },
    }
) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Story />
        </QueryClientProvider>
    );
},
```

### React Testing Library

You can create [custom render utilities](https://testing-library.com/docs/react-testing-library/setup#custom-render) for Testing Library to provide the same functionality as a [`wrapper`](https://testing-library.com/docs/react-testing-library/api/#wrapper). A wrapper utilizes a similar approach, it supplies context from a `Provider` anywhere context is needed.

I took a similar approach here where I create a new `QueryClient` each time I render something to keep the cache fresh. You can easily override this to use the same instance across tests by supplying it in the configuration argument.

I also like to expose a new wrapper prop just incase I need additional context for a specific test.

```js
// src/test-utils/renderWithProviders.js

function renderWithProviders(
    ui,
    {
        queryClient = new QueryClient({
            defaultOptions: { queries: { staleTime: Infinity, retry: false } },
        }),
        wrapper: Wrapper = ({ children }) => <>{children}</>,
        ...restConfig
    } = {}
) {
    return TestingLibrary.render(ui, {
        ...restConfig,
        wrapper: ({ children }) => (
            <QueryClientProvider client={queryClient}>
                <Wrapper>{children}</Wrapper>
            </QueryClientProvider>
        ),
    });
}
```

## No More Influenced Patterns

I cannot emphasis enough how much MSW has improved my workflow. It's adaptable to any scenario and it completely mitigates having to mock your XHR client. This means it functions just as well at mocking those requests in the browser as it does in Node.

I first discoverd it in this article by [Kent C. Dodds](https://kentcdodds.com/blog/stop-mocking-fetch) and there are a lot of patterns it's allowed me to retire. Such as creating [Presentational components with properties they receive directly from a Container component](https://www.howtogeek.com/devops/what-are-presentational-and-container-components-in-react/#:~:text=React%20has%20a%20component-based%20architecture%20that%20encourages%20you,Presentational%20and%20Container%20%28also%20known%20as%20%E2%80%9CStateful%E2%80%9D%29%20components.).

I no longer need to abstract stateful operations from my presentational code because it makes it more testable. I can make those decisions solely to improve the readability and organization of my code.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
