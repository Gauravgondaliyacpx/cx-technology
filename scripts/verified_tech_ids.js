const verifiedTechIds = [
  // 1. Code, IDEs, and Screens (Pure Software & Web Development)
  "photo-1555066931-4365d14bab8c", // Code on laptop screen
  "photo-1517694712202-14dd9538aa97", // Laptop with code & coffee
  "photo-1526374965328-7f61d4dc18c5", // Matrix / binary tech code
  "photo-1542838132-92c53300491e", // Programming code on monitor
  "photo-1607799279861-4dd421887fb3", // Code editor close-up
  "photo-1587620962725-abab7fe55159", // Laptop keyboard with code
  "photo-1504639725590-34d0984388bd", // Code on dark screen
  "photo-1515879218367-8466d910aaa4", // Python code editor
  "photo-1526379095098-d400fd0bf935", // Cyber tech matrix code
  "photo-1550751827-4bd374c3f58b", // Cyber security & network
  "photo-1558494949-ef010cbdcc31", // Server rack & cloud infrastructure
  "photo-1562813733-b31f71025d54", // Hacker & cyber terminal
  "photo-1525547719571-a2d4ac8945e2", // Developer workstation
  "photo-1519389950473-47ba0277781c", // Modern tech team at computers
  "photo-1531482615713-2afd69097998", // Dual-monitor developer setup
  "photo-1498050108023-c5249f4df085", // Modern web developer desk
  "photo-1461749280684-dccba630e2f6", // HTML / CSS code on screen
  "photo-1488590528505-98d2b5aba04b", // High-tech development setup
  "photo-1504384308090-c894fdcc538d", // Modern developer workspace
  "photo-1510915361894-db8b60106cb1", // Developer coding at night
  "photo-1526925539332-aa3b66e35444", // Code and programming syntax
  "photo-1555949963-ff9fe0c870eb", // Software algorithm on screen
  "photo-1516321318423-f06f85e504b3", // Digital tech interface
  "photo-1517430816045-df4b7de11d1d", // Modern software developer desk
  "photo-1527689368864-3a821dbccc34", // Coding on laptop
  "photo-1531297484001-80022131f5a1", // High tech laptop glowing
  "photo-1550439062-609e1531270e", // Code editor interface
  "photo-1584949091598-c31daaaa4aa9", // Code on screen close-up
  "photo-1629654297299-c8506221ca97", // Modern terminal and code
  "photo-1571171637578-41bc2dd41cd2", // Web developer working on code
  "photo-1499750310107-5fef28a66643", // Developer desk setup with MacBook

  // 2. AI / ML & Cloud Infrastructure (Pure Artificial Intelligence)
  "photo-1677442136019-21780ecad995", // Artificial Intelligence & Machine Learning
  "photo-1620712943543-bcc4688e7485", // AI neural network abstract
  "photo-1618005182384-a83a8bd57fbe", // Modern 3D digital gradient
  "photo-1639762681485-074b7f938ba0", // AI data blockchain & neural nodes
  "photo-1644088379091-d574269d422f", // AI / ML neural network visualization
  "photo-1544197150-b99a580bb7a8", // Modern cloud server room
  "photo-1509228468518-180dd4864904", // Tech analytics & graphs
  "photo-1551288049-bebda4e38f71", // Data dashboard & analytics
  "photo-1451187580459-43490279c0fa", // Global cloud network
  "photo-1535378917042-10a22c95931a", // Modern robotics & AI research
  "photo-1581091226825-a6a2a5aee158", // High tech lab development
  "photo-1581092160607-ee22621dd758", // Engineering research lab
  "photo-1581092580497-e0d23cbdf1dc", // Tech engineering precision
  "photo-1581092918056-0c4c3acd3789", // High tech innovation lab

  // 3. Web Design, UX & Frontend (Pure Website Development)
  "photo-1507238691740-187a5b1d37b8", // Web design & UI layout
  "photo-1581291518857-4e27b48ff24e", // UI / UX wireframe design
  "photo-1547658719-da2b51169166", // Web development & responsive screen
  "photo-1586717791821-3f44a563fa4c", // Modern digital product design
  "photo-1545235617-9465d2a55698", // Web design app interface
  "photo-1508739773434-c26b3d09e071", // Design workspace layout
  "photo-1542744094-3a31f272c490", // Business analytics & dev sprint
  "photo-1542744173-8e7e53415bb0", // Collaborative software architecture
  "photo-1551836022-d5d88e9218df", // Software team standup meeting
  "photo-1517245386807-bb43f82c33c4", // Dev sprint collaboration
  "photo-1522202176988-66273c2fd55f", // Tech students and engineers coding

  // 4. Software Engineers & Tech Professionals (Portraits - Zero Nature)
  "photo-1534528741775-53994a69daeb",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1494790108377-be9c29b29330",
  "photo-1500648767791-00dcc994a43e",
  "photo-1517841905240-472988babdf9",
  "photo-1539571696357-5a69c17a67c6",
  "photo-1524504388940-b1c1722653e1",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1519085360753-af0119f7cbe7",
  "photo-1544005313-94ddf0286df2",
  "photo-1492562080023-ab3db95bfbce",
  "photo-1573496359142-b8d87734a5a2",
  "photo-1501196354995-cbb51c65aaea",
  "photo-1580489944761-15a19d654956",
  "photo-1472099645785-5658abf4ff4e",
  "photo-1531746020798-e6953c6e8e04",
  "photo-1522075469751-3a6694fb2f61",
  "photo-1567532939604-b6b5b0db2604",
  "photo-1560250097-0b93528c311a",
  "photo-1548142813-c348350df52b",
  "photo-1528892952291-009c663ce843",
  "photo-1519345182560-3f2917c472ef",
  "photo-1570295999919-56ceb5ecca61",
  "photo-1544717305-2782549b5136",
  "photo-1522529599102-193c0d76b5b6",
  "photo-1535713875002-d1d0cf377fde",
  "photo-1543610892-0b1f7e6d8ac1",
  "photo-1527980965255-d3b416303d12",
  "photo-1541823709867-1b206113eafd",
  "photo-1529626455594-4ff0802cfb7e",
  "photo-1508214751196-bcfd4ca60f91",
  "photo-1542909168-82c3e7fdca5c",
  "photo-1568602471122-7832951cc4c5",
  "photo-1517486808906-6ca8b3f04846",
  "photo-1506277886164-e25aa3f4ef7f",
  "photo-1573497019940-1c28c88b4f3e",
  "photo-1554151228-14d9def656e4",
  "photo-1542178247-c052733d0a64",
  "photo-1522071820081-009f0129c71c",
  "photo-1534972195531-d756b99fa9f2"
];

module.exports = verifiedTechIds;

