const complianceRules = {
    GDPR: [
        {
            id: "GDPR-01",
            title: "Data Collection Purpose",
            rule: "The document should clearly explain the purpose for collecting personal data."
        },
        {
            id: "GDPR-02",
            title: "Third-Party Data Sharing",
            rule: "The document should clearly explain when and why personal data may be shared with third parties."
        },
        {
            id: "GDPR-03",
            title: "Data Retention",
            rule: "The document should clearly describe how long personal data is retained or how the retention period is determined."
        }
    ],

    CCPA: [
        {
            id: "CCPA-01",
            title: "Personal Information Collection",
            rule: "The document should clearly explain what categories of personal information are collected."
        },
        {
            id: "CCPA-02",
            title: "Data Sharing Disclosure",
            rule: "The document should clearly explain how personal information may be shared or disclosed."
        },
        {
            id: "CCPA-03",
            title: "User Choice",
            rule: "The document should clearly explain available user choices related to their personal information."
        }
    ],

    HIPAA: [
        {
            id: "HIPAA-01",
            title: "Health Information Handling",
            rule: "The document should clearly explain how sensitive health-related information is handled."
        },
        {
            id: "HIPAA-02",
            title: "Information Disclosure",
            rule: "The document should clearly explain circumstances in which sensitive health information may be disclosed."
        },
        {
            id: "HIPAA-03",
            title: "Data Protection",
            rule: "The document should describe appropriate safeguards for protecting sensitive health information."
        }
    ],

    ISO27001: [
        {
            id: "ISO-01",
            title: "Information Security",
            rule: "The document should describe how important information is protected."
        },
        {
            id: "ISO-02",
            title: "Access Control",
            rule: "The document should describe how access to sensitive information is controlled."
        },
        {
            id: "ISO-03",
            title: "Security Incident Handling",
            rule: "The document should describe how security incidents are identified and handled."
        }
    ]
};

export default complianceRules;