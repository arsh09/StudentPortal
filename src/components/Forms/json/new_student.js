export const newStudentFormJson = {

    pages: [
        {
            name: "page1",
            elements: [
                {
                    type: "panel",
                    name: "personal-information",
                    title: "Personal Information",
                    state: "expanded",
                    elements: [
                        {
                            type: "text",
                            name: "student_name",
                            title: "Student Name",
                            startWithNewLine: true,
                            isRequired: false
                        }, 
                        {
                            type: "dropdown",
                            name: "gender",
                            title: "Gender",
                            startWithNewLine: false,
                            isRequired: false,
                            choices: [
                                { key: 0, value: "Male" },
                                { key: 1, value: "Female" },
                                { key: 2, value: "Other" },
                            ]
                        },
                        {
                            type: "text",
                            name: "date_of_birth",
                            title: "Date of birth",
                            startWithNewLine: false,
                            isRequired: false,
                            inputType: "date",
                            autocomplete: "bday",
                            maxValueExpression: "today()"
                        },
                        {
                            type: "text",
                            name: "birth_form_number",
                            startWithNewLine: true,
                            title: "Birth (B) form number",
                            isRequired: false
                        },
                        {
                            type: "dropdown",
                            name: "country",
                            startWithNewLine: false,
                            isRequired: false,
                            title: "Country",
                            choicesByUrl: {
                                url: "https://surveyjs.io/api/CountriesExample",
                                valueName: "name"
                            }
                        },
                        {
                            type: "text",
                            name: "religion",
                            startWithNewLine: false,
                            title: "Religion",
                            isRequired: false
                        },
                        {
                            type: "text",
                            name: "guardian_name",
                            startWithNewLine: true,
                            title: "Guardian Name",
                            isRequired: false
                        },
                        {
                            type: "text",
                            name: "guardian_cnic",
                            startWithNewLine: false,
                            title: "Guardian CNIC",
                            isRequired: false
                        },
                        {
                            type: "dropdown",
                            name: "guardian_relation",
                            startWithNewLine: false,
                            title: "Relation with Guardian",
                            isRequired: false,
                            choices: [
                                { key: 0, value: "Father" },
                                { key: 1, value: "Mother" },
                                { key: 2, value: "Brother" },
                                { key: 3, value: "Sister" },
                                { key: 4, value: "Other" },
                            ]
                        },
                        {
                            type: "text",
                            name: "guardian_phone",
                            startWithNewLine: false,
                            title: "Guardian Contact",
                            isRequired: false
                        },
                    ]
                },
                {
                    type: "panel",
                    name: "admission-information",
                    title: "Admission Information",
                    state: "expanded",
                    elements: [
                        {
                            type: "dropdown",
                            name: "school_name",
                            title: "School Name",
                            startWithNewLine: true,
                            isRequired: false,
                            choices: [
                                { key: 0, value: "GBSS Jamia Tajia" },
                            ]
                        },
                        {
                            type: "dropdown",
                            name: "campus_name",
                            startWithNewLine: false,
                            title: "Campus Name",
                            isRequired: false,
                            choices: [
                                { key: 0, value: "GBSS Jamia Tajia" },
                            ]
                        },
                        {
                            type: "text",
                            name: "gnr_number",
                            title: "GRN ID",
                            startWithNewLine: false,
                            isRequired: false,
                        },
                        {
                            type: "text",
                            name: "admission_date",
                            title: "Admission Date",
                            startWithNewLine: true,
                            isRequired: false,
                            inputType: "date",
                            autocomplete: "bday",
                            maxValueExpression: "today()"
                        },
                        {
                            type: "text",
                            name: "class_id",
                            startWithNewLine: false,
                            title: "Class ID",
                            isRequired: false
                        },
                        {
                            type: "text",
                            name: "group_id",
                            startWithNewLine: false,
                            title: "Group ID",
                            isRequired: false
                        },
                        {
                            type: "text",
                            name: "remarks",
                            startWithNewLine: true,
                            title: "Additional Remarks",
                            isRequired: false
                        },
                    ]
                },


            ]
        }
    ],
    title: "New Student Entry",
    completeText: "Add Student",
    showQuestionNumbers: false,
    questionErrorLocation: "bottom",
};