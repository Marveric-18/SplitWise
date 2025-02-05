// Custom context type for GraphQL resolvers
export interface MyContext {
    req: Request; // HTTP request object
    res: Response; // HTTP response object
    payload?: any; // Optional payload (e.g., user authentication details)
    headers: { [key: string]: any }
  }