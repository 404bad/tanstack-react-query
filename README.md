# TanStack React Query

TanStack Query (formerly React Query) is a powerful library for managing, fetching, caching, and updating asynchronous server state in web applications. It abstracts away the complex boilerplate code typically associated with handling data from APIs, allowing developers to focus more on core application logic.

## Query ClientProvider

In React Query, the Query ClientProvider is a crucial component that provides a QueryClient instance to your React application. This Query Client is responsible for managing all the data fetching, caching

## QueryClient

It is the core part of the react-query library. It manages the caching, background fetching, data synchronization, and other query-related logic. It provides a centralized store for managing and caching asynchronous data in your application.

### new QueryClient()

This creates a new QueryClient instance with default settings. You can configure it with options if needed (e.g., setting cache time, stale time, etc.).

## Query ClientProvider

This component is part of react-query and is used to provide the
QueryClient instance to your entire React app (or a portion of it). This makes the qu client available via React's context API so that all the components in the tree can the useQuery, use Mutation, and other hooks provided by react-query.

## useQuery

Fetches and reads data (GET requests) from an API and automatically caches the result.

## use Mutation

Used for creating, updating, or deleting data (POST, PUT, DELETE requests) and allows triggering manual side effects.

## queryKey

The queryKey is typically an array or string that uniquely identifies a query. It allows React Query to determine if the data in the cache is associated with a particular request.

It is used to cache data with a specific key and refetch or update data when certain dependencies change.

## Stale time

Think of it as a restaurant where you ordered a pizza.
After the pizza is delivered, you consider it fresh for 10 minutes.

👉 In React Query, this means if your component remounts or you revisit the page within that staleTime, it won’t refetch because the data is still considered fresh.

## gc time

How long you keep leftovers before throwing them away
Suppose you don’t eat the pizza immediately. You keep it on the table for 4 hours. After 4 hours, the restaurant clears the table (garbage collected).

👉 In React Query, this means if a query is not used by any component, it will stay in memory (cache) for cacheTime. After that, React Query garbage collects it.

#### steps

```zsh
bun add @tanstack/react-query

bun add @tanstack/react-query-devtools

```
