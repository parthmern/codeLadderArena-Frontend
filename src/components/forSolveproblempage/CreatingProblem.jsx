import React from 'react'

import axios from 'axios';
import { getProblems } from '../../utils/apiUrls';

export const CreatingProblem = () => {


const markdownContent = `# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';
\`\`\``;

    const data = {
        title: "Find the Square",
        description: markdownContent,
        difficulty: "easy",
        testCases: [
            { input: "2", output: "4" },
            { input: "5", output: "25" }
        ],
        codeStubs: [
            {
                language: "JAVA",
                startSnippet: "//{ Driver Code Starts\n// Initial Template for Java\n\nimport java.io.*;\n\nclass Main {\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n\n        int n = Integer.parseInt(br.readLine().trim()); // Read the input number\n        Solution sln = new Solution();\n        System.out.println(sln.square(n)); // Output the square of the number\n    }\n}\n// } Driver Code Ends",
                userSnippet: "// User function Template for Java\nclass Solution {\n\n    int square(int n) {\n        // Return the square of the given number\n        return n * n;\n    }\n}",
                endSnippet: ""
            }
        ],
        editorial: "To find the square of a number, multiply the number by itself."
    };

// Function to send data to backend
const sendMarkdownToBackend = async () => {
    try {
        const response = await axios.post( getProblems , data)

        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Call the function
sendMarkdownToBackend();


    

  return (
    <div>CreatingProblem</div>
  )
}
