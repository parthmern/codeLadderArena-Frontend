import React from 'react';
import MarkdownPreview from "@uiw/react-markdown-preview";

export const ProblemViewer = ({ markdown }) => {

//     markdown = `
//     # Markdown Editor
    
//     ---
    
//     **Hello world!!!**
    
//     [![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)
    
//     \`\`\`javascript
//     import React from "react";
//     import ReactDOM from "react-dom";
//     import MEDitor from '@uiw/react-md-editor';
    
//     \`\`\`
//     `;

//     const sanitizedMarkdown = markdown;
//     const source = `
// # Markdown Editor

// ---

// **Hello world!!!**

// [![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

// \`\`\`javascript
// import React from "react";
// import ReactDOM from "react-dom";
// import MEDitor from '@uiw/react-md-editor';

// \`\`\`
// `;

    

    return (
        <div className='text-white overflow-x-hidden geist-sans mt-16 ml-5 w-[45%] h-[85%] bg-[#05050a] flex flex-col border-[1px] border-[#d6ebfd30] rounded-xl p-5  '>

    <div data-color-mode="dark">
        <MarkdownPreview className='p-5 rounded-xl' source={markdown} />
      </div>

        </div>
    );
};
