const interventions = [
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Surveillance",
        "Definition": "Purposeful and ongoing acquisition, interpretation, and synthosis of patient data for clinical decision making.",
        "Code": 6650
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Spiritual Support",
        "Definition": "Assisting the patient to feel balance and connection with a greater power.",
        "Code": 5420
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Admission Care",
        "Definition": "Facilitating entry of a patient into a health care facility.",
        "Code": 7310
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Medication Management",
        "Definition": "Facilitation of safe and effective use of prescription and over-the-counter drugs. ",
        "Code": 2380
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Emotional Support",
        "Definition": "Provision of reassurance, acceptance, and encouragement during times of stress.",
        "Code": 5270
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Referal",
        "Definition": "Arrangement for services by another care provider or agency.",
        "Code": 8100
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Vital Signs Monitoring",
        "Definition": "Collection and analysis of cardiovascular, respiratory, and body temperature data to determine and prevent complications.",
        "Code": 6680
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Financial Resource Assistance",
        "Definition": "Assisting an individual/family to secure and manage finances to meet health care needs.",
        "Code": 7380
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Coping Enhancement",
        "Definition": "Assisting a patient to adapt to perceived stressors, changes, or threats that interfere with meeting life demands and roles. ",
        "Code": 5230
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Support System Enhancement",
        "Definition": "Faciliataion of support to patient by family, friends, and community.",
        "Code": 5440
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Health System Guidance",
        "Definition": "Facilitating a patient's location and use of appropriate health services. ",
        "Code": 7400
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Active Listening",
        "Definition": "Attending closely to and attaching significance to a patient's verbal and nonverbal messages.",
        "Code": 4920
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Telephone Consultation",
        "Definition": "Eliciting patient's concerns; listening; and providing support, information, or taching in response to patient's stated concerns, over the telephone.",
        "Code": 8180
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Circulatory Care: Venous Insufficiency",
        "Definition": "Promotion of venous circulation.",
        "Code": 4066
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Grief Work Facilitation",
        "Definition": "Assistance with the resolution of a significant loss.",
        "Code": 5290
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Presence",
        "Definition": "Being wit another, both physically and psychologically, during tims of need.",
        "Code": 5340
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Multidisciplinary Care Conference",
        "Definition": "Planning and evaluating patient care with health professionals from other disciplines.",
        "Code": 8020
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Religious Ritual Enhancement",
        "Definition": "Facilitating participation in religious practices. ",
        "Code": 5424
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Caregiver Suppot",
        "Definition": "Provision of the necessary information, advocacy, and support to facilitate primary patient care by someone other than a health care professional.",
        "Code": 7040
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Oxygen Therapy",
        "Definition": "Administration of oxygen and monitoring of its effectiveness.",
        "Code": 3320
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Rick Identification",
        "Definition": "Analysis of potential risk factors, determination of health risks, and prioritization of risk reduction strategies for an individual or group.",
        "Code": 6610
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Dying Care",
        "Definition": "Promotion of physical comfort and psychological peace in the final phase of life.",
        "Code": 5260
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Family Support",
        "Definition": "Promotion of family values, interest and goals.",
        "Code": 7140
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Teaching: Prescribed Medication",
        "Definition": "Preparing a patient to safely take prscribed medications and monitor for their effects.",
        "Code": 5616
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Health Care Information Exchange",
        "Definition": "Providing patient care information to other health professionals.",
        "Code": 7960
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Decision-Making Support",
        "Definition": "Providing information and support for a patient who is making a decision regarding health care.",
        "Code": 5250
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Home Maintenance Assistance",
        "Definition": "Helping the paitent/family to maintain the home as a clean, safe, and pleasant place to live. ",
        "Code": 7180
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Wound Care",
        "Definition": "Prevention of wound complications and promotion of wound healing.",
        "Code": 3660
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Abuse Protection Support: Domestic Partner",
        "Definition": "Identification of high-risk, dependent domestic relationships and actions to prevent possible or further infliction of physical, sexual, or emotional harm or exploitation of a domestic partner",
        "Code": 6403
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Patient Rights Protection",
        "Definition": "Protection of health care rights of a patient, especially a minor, incapacitated, or incompetent patient uable to make decisions.",
        "Code": 7460
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Technology Management",
        "Definition": "Use of technical equipment and devices to monitor patiet condition or sustain life.",
        "Code": 7880
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Pain Management",
        "Definition": "Alleviation of pain or a reduction in pain to a level of comfort that is acceptabe to the patient. ",
        "Code": 1400
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Abuse Protection Support",
        "Definition": "Identification of high-risk dependent relationships and actions to prevent further infliction of physical or emotional harm. ",
        "Code": 6400
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Abuse Protection Support: Child",
        "Definition": "Identification of high-risk, dependent child relationships and actions to prevent possible or further infliction of physical, sexual, or emotional harm or neglect of basic necessities of life. ",
        "Code": 6402
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Abuse Protection Support: Elder",
        "Definition": "Identification of high-risk, dependent elder relationships and actions to prevent possible or further infliction of physical, sexual, or emotional harm; neglect of basic necessities of life, or exploitation.",
        "Code": 6404
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Abuse Protection Support: Religious",
        "Definition": "Identification of high-risk, controlling religious relationships and actions to prevent infliction of physical, sexual, or emotional harm and/or exploitation.",
        "Code": 6408
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Anticipatory Guidance",
        "Definition": "Preparation of patient for an anticipated developmental and/or situational crisis.",
        "Code": 5210
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Counseling",
        "Definition": "Use of an interactive helping process focusing on the needs, problems, or feelings of the patient and significant others to enhance or support coping, problem solving, and interpersonal relationships. ",
        "Code": 5240
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Crisis Intervention",
        "Definition": "Use of short-term counseling to help the patient cope with a crisis and resume a state of functioning comparable to or better than the pre-crisis state.",
        "Code": 6160
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Culture Brokerage",
        "Definition": "The deliberate use of culturally competent strategies to bridge or mediate between the patient's culture and the biomedical healh care system.",
        "Code": 7330
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Environmental Management: Community",
        "Definition": "Monitoring and influencing of the physcial, social, cultural, economic, and political conditions that affect the health of groups and communities.",
        "Code": 6484
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Fall Prevention",
        "Definition": "Instituting special precautions with patient at risk for injury from falling.",
        "Code": 6490
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Family Integrity Promotion",
        "Definition": "Promotion of family cohesion and unity.",
        "Code": 7100
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Family Integrity Promotion: Childbearing Family",
        "Definition": "Facilitation of the growth of individuals or family who are adding an infant to the family unit.",
        "Code": 7104
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Family Involvement Promotion",
        "Definition": "Facilitating family participation in the emotional and physicial care of the patient. ",
        "Code": 7110
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Family Mobilization",
        "Definition": "Utilization of family strengths to influence patient's health in a positive direction.",
        "Code": 7120
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Family Presence Facilitation",
        "Definition": "Facilitation of the family's presence in support of an individual undergoing resuscitation and/or invasive procedures.",
        "Code": 7170
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Family Process Management",
        "Definition": "Minimization of family process disruption effects.",
        "Code": 7130
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Family Therapy",
        "Definition": "Assissting family members to move their family toward a more productive way of living.",
        "Code": 7150
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Forgiveness Facilitation",
        "Definition": "Assisting an individual to forgive and/or experience foregiveness in relationship with self, others, and higher power.",
        "Code": 5280
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Grief Work Facilitation: Perinatal Death",
        "Definition": "Assistance with the resolution of a perinatal loss.",
        "Code": 5294
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Guilt Work Facilitation",
        "Definition": "Helping another to cope with painful feelings of responsibility, actual or perceived.",
        "Code": 5300
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Health Education",
        "Definition": "Developing and providing instruction and learning experiences to facilitate voluntary adaptation of behavior conducive to health in individiauls, families, groups, or comunities. ",
        "Code": 5510
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Hope Instillation",
        "Definition": "Facilitation of the deelopment of a positive outlook in a given situation.",
        "Code": 5310
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Humon",
        "Definition": "Faciliatating the patient to perceive, appreciate, and express what is funny, amusing, or ludicrous in order to establish relationships, relieve tension, release anger, facilitate learning, or cope with painful feelings. ",
        "Code": 5320
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Religious Addiction Prevention",
        "Definition": "Prevention of a self-imposed controlling religious lifestyle.",
        "Code": 5422
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Relocation Stress Reduction",
        "Definition": "Assisting the individual to prepare for and cope with movment from one environment to another. ",
        "Code": 5350
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Self-Care Assistance: IADL",
        "Definition": "Assisting and instructing a person to perform instrumental activities of daily living (IADL) needed to funtion in the home or community. ",
        "Code": 1805
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Socialization Enhancement",
        "Definition": "Facilitation of another person's ability to interact with others.",
        "Code": 5100
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Spiritual Growth Facilitation",
        "Definition": "Facilitation of growth in patient's capacity to identify, connect with, and call upon the source of meaning, purpose, comfort, strength, and hope in the patient's life.",
        "Code": 5462
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Sustenance Support",
        "Definition": "Helping a needy individual/family to locate food, clothing, or shelter.",
        "Code": 7500
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Surveillance: Community",
        "Definition": "Purposeful and ongoing acquisition, interpretation, and sysnthesis of data for decision making in the community.",
        "Code": 6652
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Teaching: Disease Process",
        "Definition": "Assisting the patient to understand information related to a specific disease process.",
        "Code": 5602
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Teaching: Foot Care",
        "Definition": "Preparing a patient at risk and/or significant other to provide preventative foot care.",
        "Code": 5603
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Teaching: Group",
        "Definition": "Development, implementation, and evaluation of a patient teaching program for a group of individuals experiencing the same health condition.",
        "Code": 5604
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Teaching: Individual",
        "Definition": "Planning, implementation, and evaluation of a teaching program designed to addresss a patient's particular needs.",
        "Code": 5606
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Teaching: Prescribed Diet",
        "Definition": "Preparing a patient to correctly follow a prescribed diet.",
        "Code": 5614
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Teaching: Procedure/Treatment",
        "Definition": "Preparing a patient to understand and mentally prepare for a prescribed procedure or treatment.",
        "Code": 5618
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Telephone Follow-Up",
        "Definition": "Providing results of testing or evaluating patient's response and determining potiential for problems as a result of previous treatment, examination, or testing, over the telephone.",
        "Code": 8190
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Touch",
        "Definition": "Providing comfort and communication through purposeful tactile contact.",
        "Code": 5460
    },
    {
        "Core FCN Intervention": true,
        "Nursing Intervention": "Values Clarification",
        "Definition": "Assisting another to clarify their own values in order to faciitate effective decision making.",
        "Code": 5480
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Weight Gain Assistance",
        "Definition": "Facilitating gain of body weight.",
        "Code": 1240
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Weight Management",
        "Definition": "Facilitating maintenance of optimal body weight and percent body fat.",
        "Code": 1260
    },
    {
        "Core FCN Intervention": false,
        "Nursing Intervention": "Weight Reduction Assistance",
        "Definition": "Facilitating loss of weight and /or body fat.",
        "Code": 1280
    }
]


export default interventions