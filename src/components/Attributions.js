import React from 'react'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

export default function Attributions() {
    return (
        <div className="flex justify-evenly">
            <div>
                <h3 className="text-lg">Gordon Campbell</h3>
                <div className=" flex justify-evenly">
                    <a href="https://github.com/mintyjones">
                        <GitHubIcon style={{ fontSize: "35"}}></GitHubIcon>
                    </a>
                    <a href="https://www.linkedin.com/in/gordon-campbell-3250439/">
                        <LinkedInIcon style={{ fontSize: "45"}}></LinkedInIcon>
                    </a>
                </div>
            </div>
                
                
            <div>
                <h3 className="text-lg">Anthony Carroll</h3>
                <div className="flex justify-evenly">
                    <a href="https://github.com/AnthonyCarroll97">
                        <GitHubIcon style={{ fontSize: "35"}}></GitHubIcon>
                    </a>
                    <a href="https://www.linkedin.com/in/anthony-carroll-3130661bb/">
                        <LinkedInIcon style={{ fontSize: "45"}}></LinkedInIcon>
                    </a>
                </div>
            </div>
        </div>
    )
}
