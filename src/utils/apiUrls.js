let problemServiceUrl = process.env.REACT_APP_PROBLEM_SERVICE_URL ;
const apiVersion = "/api/v1/";

problemServiceUrl = problemServiceUrl + apiVersion ;

const getProblems = problemServiceUrl + 'problems';

const authUser = problemServiceUrl + 'auth/login';

const verifyToken = problemServiceUrl + 'auth/verifyToken';

const getSingleProblem = getProblems ;

const createProblemUrl = getProblems;

let submisssionService = process.env.REACT_APP_SUBMISSION_SERVICE_URL; 

submisssionService = submisssionService + apiVersion ;

const submitProblemUrl = submisssionService + "submission";

let submissionDetailsUrl = problemServiceUrl + "submissionDetails";

const allSubmissionsUrl = submissionDetailsUrl + "/user";

const getSubmissionByUserAndProblemUrl = submissionDetailsUrl;

const socketServiceUrl = process.env.REACT_APP_SOCKET_SERVICE_URL;

export {
    problemServiceUrl,
    getProblems,
    authUser,
    verifyToken,
    getSingleProblem,
    createProblemUrl,
    submitProblemUrl,
    submissionDetailsUrl,
    allSubmissionsUrl,
    getSubmissionByUserAndProblemUrl,
    socketServiceUrl
}