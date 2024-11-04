const LOCAL_KEY = "my-note-list";

const noteList = [
  {
    id: 1,
    title: "Meeting with Team",
    note: "Discussed the upcoming project deadlines and assigned tasks to each team member. We also reviewed the progress of the current sprint and identified any blockers. The team agreed to have daily stand-ups to ensure smooth communication and progress tracking.",
    col: 1,
    time: "2024-08-01T09:00:00Z",
  },
  {
    id: 2,
    title: "Client Feedback",
    note: "Received feedback from the client regarding the latest product demo. They were pleased with the new features but suggested some improvements in the user interface. We need to prioritize these changes in the next sprint to ensure client satisfaction.",
    col: 2,
    time: "2024-08-02T11:30:00Z",
  },
  {
    id: 3,
    title: "Code Review",
    note: "Conducted a code review session with the development team. Identified several areas for improvement, including code optimization and better error handling. The team will work on these changes and submit the updated code for another review next week.",
    col: 3,
    time: "2024-08-03T14:00:00Z",
  },
  {
    id: 4,
    title: "Design Mockups",
    note: "Reviewed the latest design mockups for the new feature. The designs look promising, but there are a few tweaks needed to align with the overall product theme. The design team will make the necessary adjustments and present the updated mockups in the next meeting.",
    col: 4,
    time: "2024-08-04T10:00:00Z",
  },
  {
    id: 5,
    title: "Sprint Planning",
    note: "Held a sprint planning meeting to outline the tasks and goals for the upcoming sprint. Each team member provided their input on the estimated time and effort required for their assigned tasks. The sprint backlog has been updated accordingly.",
    col: 1,
    time: "2024-08-05T09:00:00Z",
  },
  {
    id: 6,
    title: "Bug Fixes",
    note: "Addressed several critical bugs reported by the QA team. The fixes have been implemented and tested. The updated code has been merged into the main branch, and a new build has been deployed to the staging environment for further testing.",
    col: 2,
    time: "2024-08-06T15:00:00Z",
  },
  {
    id: 7,
    title: "User Testing",
    note: "Conducted user testing sessions to gather feedback on the new feature. The participants provided valuable insights into the usability and functionality of the feature. Based on their feedback, we have identified several areas for improvement.",
    col: 3,
    time: "2024-08-07T13:00:00Z",
  },
  {
    id: 8,
    title: "Performance Optimization",
    note: "Worked on optimizing the performance of the application. Implemented several changes to reduce the load time and improve the overall responsiveness. The performance metrics have shown significant improvement after these changes.",
    col: 4,
    time: "2024-08-08T16:00:00Z",
  },
  {
    id: 9,
    title: "Team Retrospective",
    note: "Held a team retrospective meeting to discuss the successes and challenges of the previous sprint. The team shared their thoughts on what went well and what could be improved. Action items have been identified to enhance the team's performance in the next sprint.",
    col: 1,
    time: "2024-08-09T10:00:00Z",
  },
  {
    id: 10,
    title: "Feature Deployment",
    note: "Successfully deployed the new feature to the production environment. The deployment process went smoothly without any major issues. The feature is now live and available to all users. Monitoring tools have been set up to track the performance and usage of the feature.",
    col: 2,
    time: "2024-08-10T12:00:00Z",
  },
];

const colorList = [
  { id: 1, color: "red" },
  { id: 2, color: "green" },
  { id: 3, color: "blue" },
  { id: 4, color: "orange" },
];

export { colorList, noteList, LOCAL_KEY };
