//listing element
document.getElementById("resumeForm")?.addEventListener("submit", function(event) {
    event.preventDefault();

    const profilePictureInput = document.getElementById(
        "profilePicture"
    ) as HTMLInputElement;
                
    //type assertion
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById( 'education')  as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;

    //* 


    if(profilePictureInput &&
     nameElement && 
     emailElement && 
     phoneElement && 
     educationElement && 
     experienceElement && 
     skillsElement 
    ) 
        //* 
        
        {
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

//*

const profilePictureFile = profilePictureInput.files?.[0];
const profilePictureURL = profilePictureFile
 ? URL.createObjectURL(profilePictureFile)
 :"";


    //create resume output
    const resumeHTML = `
    <h2>Resume</h2>
    ${profilePictureURL ?  `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : "" }
    <p><strong>Name:</strong>  ${name}  </p>
    <p><strong>Email:</strong>  ${email} </p>
    <p><strong>Phone:</strong>  ${phone} </p>

    <h3>Education</h3>
    <p>${education}</p>

     <h3>Experience</h3>
    <p>${experience}</p>

     <h3>Skills</h3>
    <p>${skills}</p>
    `;

 const resumeOutputElement = document.getElementById("resumeOutput");
 if(resumeOutputElement) {
    resumeOutputElement.innerHTML = resumeHTML;
    resumeOutputElement.classList.remove("hidden");

    const buttonsContainer = document.createElement("div");
    buttonsContainer.id = "buttonsContainer";
    resumeOutputElement.appendChild(buttonsContainer);

    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download as PDF";
    downloadButton.addEventListener("click" , () => {
        window.print(); 
    });
    buttonsContainer.appendChild(downloadButton);

    const shareLinkButton = document.createElement("button");
    shareLinkButton.textContent = "Copy Shareable Link";
    shareLinkButton.addEventListener("click", async () => {
        try{
            const ShareableLink = `https://yourdomain.com/resumes/${name.replace(
                /\s+/g,
                "_"
            )}_cv.html`;

            await navigator.clipboard.writeText(ShareableLink);
            alert("Shareable link copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy link: ", err);
            alert("Failed to copy link to clipboard. Please try again.");
        }
    });
    buttonsContainer.appendChild(shareLinkButton);
 } else {
    console.error("Resume Output container not found");
 }
}else {
    console.error("Found elements are missing");
}
});

