interface Request {
    path?: string;
    method?: string;
    params?: Record<string, string>;
    query?: Record<string, string> | null;
    body?: any | null;
    user?: any | null;
    headers?: Record<string, string>;
  }
  
  interface AdaptedRequest {
    path?: string;
    method?: string;
    pathParams?: Record<string, string>;
    queryParams?: Record<string, string> | null;
    body?: any | null;
    user?: any | null;
    headers?: Record<string, string>;
  }
  
  const adaptRequest = (req: Request = {}): AdaptedRequest => {
    return Object.freeze({
      path: req.path,
      method: req.method,
      pathParams: req.params,
      queryParams: req.query || null,
      body: req.body || null,
      user: req.user || null,
      headers: req.headers,
    });
  };
  
  export { adaptRequest };
  