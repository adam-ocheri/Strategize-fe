export function formatName (name : string, pluralSuffix : boolean = false) {

    const words = name.split(' ');
    const upperCaseWords = words.map((word) => (word[0].toUpperCase() + word.slice(1).toLowerCase()));

    let formattedString : string = '';

    const stringFormatter = (i : any) => {
        if (pluralSuffix) {
            const yFmt = upperCaseWords[i].at(-1) == 'y';
            if (yFmt) {
                return upperCaseWords[i].slice(0, -1) + 'ies';
            } else {
                return upperCaseWords[i] + 's';
            }
        } else {
            return upperCaseWords[i];
        }

    }

    for (let i = 0 ; i < upperCaseWords.length; ++i){
        if (i > 0){
            const applyPluralFormatting : boolean = i == upperCaseWords.length - 1 && pluralSuffix;
            const spacedWord : string = ' ' + stringFormatter(i);
            formattedString += spacedWord;
        } else {
            if (upperCaseWords.length == 1) {
                formattedString = stringFormatter(i);
            } else {
                formattedString = upperCaseWords[i];
            }
        }
    }
    
    return formattedString;
}

export function formUpdate (e : Event | any, setFormData : any) {
    e.preventDefault();
    const isEditingDefaults : boolean = isDefaults(e.target.name);

    if (isEditingDefaults) {
        setFormData((prevState : any) => {
            
            let numModifiedAttributes = 0;
            for (let field in prevState.defaults) {
                if (prevState.defaults[field]) {
                    ++numModifiedAttributes;
                }
            }

            const fDefaults : Object | any = prevState.defaults
            const defaults : Object = {};
            
            for (let field in fDefaults) {
                if (field === e.target.name) {
                    Object.defineProperty(defaults, field, {value: e.target.value, writable: true, enumerable: true, configurable: true})
                } 
                else {
                    Object.defineProperty(defaults, field, {value: fDefaults[field], writable: true, enumerable: true, configurable: true})
                }
            }
            return ({
                ...prevState,
                defaults
            })
        })
    } else {
        setFormData((prevState : any) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    } 
}

export function formatFormSubmission(formData : Object | any, placeholders : Object |any) {
    let body : Object = {};
   
    for  (let field in formData)
    {
        const val = Object.getOwnPropertyDescriptor(formData, field)?.value;

        if (val.length && val.length !== 0 && field !== 'defaults')
        {
            Object.defineProperty(body, field, {value: formatName(val), writable: true, enumerable: true, configurable: true});
        }
        else if(field === 'defaults') 
        {
            let defaults : Object = {};

            for (let defaultVal in formData[field]){
                console.log('fucking looping AGAIN')   
                console.log(formData[field][defaultVal])
                const value = Object.getOwnPropertyDescriptor(formData[field], defaultVal)?.value;
                
                if (value !== '') {
                    Object.defineProperty(defaults, defaultVal, {value: formatName(value), writable: true, enumerable: true, configurable: true});
                } else {
                    Object.defineProperty(defaults, defaultVal, {value: placeholders[defaultVal], writable: true, enumerable: true, configurable: true});
                }
                
            }
            
            Object.defineProperty(body, field, {value: defaults, writable: true, enumerable: true, configurable: true});
        }
    }

    return body;
}

export function canSaveSettings(formData : Object | any) : boolean {
    let numModifiedProperties = 0;

    for  (let field in formData)
    {
        const val = Object.getOwnPropertyDescriptor(formData, field)?.value;
        if (val.length > 0 && field !== 'defaults')
        {
            ++numModifiedProperties;
        }

        if(field === 'defaults'){
            for (let defaultVal in formData.defaults){   
                const value = Object.getOwnPropertyDescriptor(formData[field], defaultVal)?.value;
                if (value.length > 0) { 
                    ++numModifiedProperties;
                }
            }
        }
    }

    return numModifiedProperties === 0;
}

export function isDefaults(field : any) : boolean {
    return field == 'ltgStation_TypeName' || field == 'objStation_TypeName' || field == 'taskStation_TypeName';
}

export function determineSubstationTypeNameOrigin({scope, activeProject, activeLTG, activeObjective} : any) : string {
    switch (scope) {
        case 'Long Term Goal':
            return (activeProject?.defaults.ltgStation_TypeName);
        case 'Objective':
            return (activeLTG?.defaults ? activeLTG.defaults.objStation_TypeName : (activeProject.defaults.objStation_TypeName));
        case 'Task':
            return activeObjective?.defaults ? activeObjective.defaults.taskStation_TypeName : 
                (activeLTG?.defaults ? activeLTG.defaults.taskStation_TypeName : 
                    (activeProject.defaults.taskStation_TypeName));
        default:
            return '';
    }
}