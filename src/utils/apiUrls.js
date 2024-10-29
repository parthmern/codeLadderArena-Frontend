let problemServiceUrl = process.env.REACT_APP_PROBLEM_SERVICE_URL ;
const apiVersion = "/api/v1/";

problemServiceUrl = problemServiceUrl + apiVersion ;

const getProblems = problemServiceUrl + 'problems';

export {
    problemServiceUrl,
    getProblems
}