import React, { useState } from 'react';
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Button } from '../shadcn/ButtonVarients';
import { SubmissionsForThisProblem } from './SubmissionsForThisProblem';

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

    const [activeTab, setActiveTab] = useState("problemTab");



    return (
        <div className='text-white overflow-x-hidden geist-sans mt-16 ml-5 w-[45%] h-[88%] bg-[#05050a] flex flex-col border-[1px] border-[#d6ebfd30] rounded-xl p-5  '>

            <div className="flex flex-wrap gap-2 mb-4">


                <Button
                    variant={activeTab === "problemTab" ? "outline" : "default"}
                    onClick={() => setActiveTab("problemTab")}
                    className={`text-gray-100 h-8 ${activeTab === "problemTab"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-800 hover:bg-gray-700"
                        }`}
                > Problem </Button>

                <Button
                    variant={activeTab === "submissionTab" ? "outline" : "default"}
                    onClick={() => setActiveTab("submissionTab")}
                    className={`text-gray-100 h-8 ${activeTab === "submissionTab"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-800 hover:bg-gray-700"
                        }`}
                > Submissions </Button>

            </div>

            <>
                {
                    activeTab === "problemTab" ? (
                        <div data-color-mode="dark">
                            <MarkdownPreview className='p-5 rounded-xl' source={markdown} />
                        </div>
                    ) : (
                        <SubmissionsForThisProblem />
                    )
                }
            </>

        </div>
    );
};
