function authenticationMiddleware (req: any, res: any, next: any) {
  console.log(req.originalUrl);
      if (req.isAuthenticated()) {
        return next();
      }
      else if(req.originalUrl === '/api/me') {
        return next();
      }
      res.sendStatus(401);
    }
  

export default authenticationMiddleware;