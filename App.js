class Input{
    constructor () {
        this.ExternalNumber = ''; 
        this.Title = ''; 
        this.Description = '' ; 
        this.Impact = ''; 
        this.CustomerUrgency = ''; 
        this.RequestType = ''; 
        this.Contact = ''; 
        this.Ref = ''; 
        this.Service = ''; 
        this.Site = ''; 
    }
}

let data = `CAUTION: This email originated from outside of the organization. Do not click links or open attachments unless you recognize the sender and know the content is safe. Report Phishing.



External Number: INC00393204

Title: users DavidS and Dgraniero disappeared from AX, while there is no Deletion in db log

Description: For instance, I've got 2 (without any searching):
1) David Strucchi - DavidS – DST, (DBGE-AR, regular TS user, >= 20 years employee)
2) David Graniero – DGraniero - DMG, DBNA new on-boarded PE, never: managed to create a TS because of setup fixed last week, and now user cannot enter at all.
I've just: recreated #2 and left #1 if you: need to check anything before I recreate it.
Please advise hat happened.

Impact: 3 - Single User

Customer Urgency: 1 - Work Blocked

Request Type: Incident

Contact: Marc Lignon

Site: DBAR

Service: AX 2012

 

Ref:MSG0381019_VTVZWWjftAeLsiLBllHk1`

function parseData(data){
    data = data.split("\n");

    let fieldNames =  ["ExternalNumber", "Title", "Description", "Impact", "CustomerUrgency",
                        "RequestType", "Contact", "Ref", "Service", "Site" ]; 

    let input = new Input();
    let prevField = {field: ""};

    for (let line of data){
        
        if (line.trim()){
            let firstDots = line.indexOf(":");

            let curField = {field: "", fieldVal: ""};

            PopulateFieldAndValue(fieldNames, line, firstDots, curField);
                
            if (fieldNames.includes(curField.field)){
                
                SetPropertyValue(input, curField, prevField);
            }else{
                FillTitleOrDescription(input, prevField, curField.fieldVal);
            }  
        }
        
    }
        
    return input;

}

function PopulateFieldAndValue(fieldNames, line,  firstDots, curField){

    if (firstDots != -1){
        curField.field = line.slice(0, firstDots).trim().replace(" ", "");
        if (fieldNames.includes(curField.field)){
            curField.fieldVal = line.slice(firstDots + 1, line.length - 1).trim();
        }else{
            curField.fieldVal = line;
        }
    }else{
        curField.field = "";
        curField.fieldVal += line;
    }
}

function SetPropertyValue(input, curField, prevField){
    if (Object.keys(input).includes(curField.field)){
        input[curField.field] = curField.fieldVal;
        prevField.field = curField.field;
    }else{
        prevField.field = "";
    }
}

function FillTitleOrDescription(input, prevField, fieldVal){
    if(prevField.field == "Title" || prevField.field == "Description"){
        input[prevField.field] += ('\n'+ fieldVal);
    }

}

console.log(parseData(data));








