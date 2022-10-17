const data = [
    {
        id: 1,
        title: "Dashboard Design for Task Manager App",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        tags: ["React", "Node", "MongoDB"],
        time: "2 days ago",
        status: "Working",
        image: "https://cdn.dribbble.com/userupload/3800319/file/original-54a969b772fca3ef0ec9b3b39f0f1b48.jpg?compress=1&resize=450x338&vertical=top",
        members: [
            { name: "John", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUB8kqGZ74kvQczb_fL00a6LecB331zRp5SQ&usqp=CAU" },
            { name: "John", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTal_yVhjVwOho5Ck1i0mqlutKZPxcOsRfIBg&usqp=CAU" },
            { name: "John", image: "https://source.unsplash.com/random" },
        ],
    },
    {
        id: 2,
        title: "Project 2",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        tags: ["React", "Node", "MongoDB"],
        time: "2 days ago",
        status: "In Progress",
        image: "",
        members: [
            { name: "John", image: "https://source.unsplash.com/random" },
            { name: "John", image: "https://source.unsplash.com/random" },
            { name: "John", image: "https://source.unsplash.com/random" },
        ],
    },
    {
        id: 3,
        title: "Project 1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        tags: ["Android", "MERN", "MongoDB"],
        time: "2 days ago",
        status: "In Progress",
        image: "",
        members: [
            { name: "John", image: "https://source.unsplash.com/random" },
            { name: "John", image: "https://source.unsplash.com/random" },
            { name: "John", image: "https://source.unsplash.com/random" },
        ],
    },
    {
        id: 4,
        title: "Project 1",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        tags: ["React", "Node", "MongoDB"],
        time: "2 days ago",
        status: "Completed",
        image: "",
        members: [
            { name: "John", image: "https://source.unsplash.com/random" },
            { name: "John", image: "https://source.unsplash.com/random" },
            { name: "John", image: "https://source.unsplash.com/random" },
        ],
    },
    {
        id: 5,
        title: "Project 2",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        tags: ["React", "Node", "MongoDB"],
        time: "2 days ago",
        status: "Completed",
        image: "https://cdn.dribbble.com/userupload/3801107/file/original-1a14267f7088e99ef74ced21616a4137.png?compress=1&resize=1504x1128",
        members: [
            { name: "John", image: "https://source.unsplash.com/random" },
            { name: "John", image: "https://source.unsplash.com/random" },
            { name: "John", image: "https://source.unsplash.com/random" },
        ],
    },
    {
        id: 6,
        title: "Project 3",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
        tags: ["React", "Node", "MongoDB"],
        time: "2 days ago",
        status: "Completed",
        image: "",
        members: [
            { name: "John", image: "https://source.unsplash.com/random" },
            { name: "John", image: "https://source.unsplash.com/random" },
            { name: "John", image: "https://source.unsplash.com/random" },
        ],
    },
];
const statuses = [
    {
        status: "Working",
        icon: "⭕️",
        color: "#EB5A46",
    },
    {
        status: "In Progress",
        icon: "🔆️",
        color: "#00C2E0",
    },
    {
        status: "Completed",
        icon: "📝",
        color: "#C377E0",
    },
];

const tagColors = [
    "#FF69B4",
    "#9932CC",
    "#FFA07A",
    "#FFD700",
    "#90EE90",
    "#20B2AA",
    "#AFEEEE",
    "#FFF0F5",
    "#B5E4CA",
    "#CABDFF",
    "#B1E5FC",
    "#FFBC99",
    
]

export  {  statuses, data , tagColors};