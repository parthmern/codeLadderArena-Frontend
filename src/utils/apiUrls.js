let problemServiceUrl = process.env.REACT_APP_PROBLEM_SERVICE_URL ;
const apiVersion = "/api/v1/";

problemServiceUrl = problemServiceUrl + apiVersion ;

const getProblems = problemServiceUrl + 'problems';

const authUser = problemServiceUrl + 'auth/login';

const verifyToken = problemServiceUrl + 'auth/verifyToken';

export {
    problemServiceUrl,
    getProblems,
    authUser,
    verifyToken
}