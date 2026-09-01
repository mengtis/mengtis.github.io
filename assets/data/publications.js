/* Publications, newest first within each group.
   To add a paper: copy an object, fill it in. `me: true` bolds the author.
   Groups render in the order listed in GROUP_ORDER (see main.js). */

const PUBLICATIONS = [
  {
    id: "spatialbench-r",
    group: "workshop",
    title: "SpatialBench-R: Evaluating Vision-Language Models on Robot-Relevant Spatial Reasoning for Tabletop Manipulation",
    authors: [
      { n: "Mengti Sun", me: true }, { n: "Bowen Jiang" },
      { n: "Minxi Duan" }, { n: "Camillo J. Taylor" }
    ],
    venue: "CVPR Workshop on Embodied AI (EAI)",
    year: 2026,
    badge: "CVPR-W 2026",
    status: "Accepted \u2014 to appear",
    why: "Shows that today's vision-language models fail at the spatial judgments a robot actually needs \u2014 whether a target is reachable, occluded, or changed by an action \u2014 exposing a gap between describing a scene and being able to act in it.",
    fig: "assets/img/pubs/spatialbench-r.png",
    figAlt: "SpatialBench-R tabletop manipulation spatial reasoning benchmark.",
    links: [
      { label: "Paper", url: "https://doi.org/10.5281/zenodo.22197469" },
      { label: "OpenReview", url: "https://openreview.net/forum?id=rR11xeRq03" },
      { label: "Code", url: "https://github.com/mengtis/spatialbench-r-release" }
    ]
  },
  {
    id: "vysics",
    group: "conference",
    title: "Vysics: Object Reconstruction Under Occlusion by Fusing Vision and Contact-Rich Physics",
    authors: [
      { n: "Bibit Bianchini" }, { n: "Minghan Zhu" }, { n: "Mengti Sun", me: true },
      { n: "Bowen Jiang" }, { n: "Camillo J. Taylor" }, { n: "Michael Posa" }
    ],
    venue: "Robotics: Science and Systems (RSS)",
    year: 2025,
    badge: "RSS 2025",
    why: "Lets a robot recover the shape of an object it can only partly see, by reasoning about what its own touch implies — a prerequisite for reliable warehouse and household manipulation in cluttered spaces.",
    citations: 14,
    fig: "assets/img/pubs/vysics.png",
    figAlt: "Vysics reconstructing an occluded object from vision and contact.",
    links: [
      { label: "Paper", url: "https://roboticsconference.org/program/papers/34/" },
      { label: "arXiv", url: "https://arxiv.org/abs/2504.18719" },
      { label: "Project Page", url: "https://vysics-vision-and-physics.github.io/" },
      { label: "Code", url: "https://github.com/DAIRLab/vysics" }
    ]
  },
  {
    id: "case2021",
    group: "conference",
    title: "Autonomous Navigation for Quadrupedal Robots with Optimized Jumping through Constrained Obstacles",
    authors: [
      { n: "Scott Gilroy" }, { n: "Derek Lau" }, { n: "Lizhi Yang" }, { n: "Ed Izaguirre" },
      { n: "Kristen Biermayer" }, { n: "Anxing Xiao" }, { n: "Mengti Sun", me: true },
      { n: "Ayush Agrawal" }, { n: "Jun Zeng" }, { n: "Zhongyu Li" }, { n: "Koushil Sreenath" }
    ],
    venue: "IEEE International Conference on Automation Science and Engineering (CASE)",
    year: 2021,
    badge: "CASE 2021",
    why: "Gives legged robots a way to plan jumps through narrow openings in real time, extending where autonomous machines can go during inspection and disaster response.",
    citations: 63,
    fig: "assets/img/pubs/case2021.jpg",
    figAlt: "MIT Mini Cheetah jumping through a window-shaped opening.",
    links: [
      { label: "Paper", url: "https://ieeexplore.ieee.org/document/9551524" },
      { label: "arXiv", url: "https://arxiv.org/abs/2107.00773" },
      { label: "Code", url: "https://github.com/mengtis/cheetah-planning" }
    ]
  },
  {
    id: "instance-agnostic",
    group: "workshop",
    title: "Instance-Agnostic Geometry and Contact Dynamics Learning",
    authors: [
      { n: "Mengti Sun", me: true }, { n: "Bowen Jiang" }, { n: "Bibit Bianchini" },
      { n: "Camillo J. Taylor" }, { n: "Michael Posa" }
    ],
    venue: "IROS Workshop on Leveraging Models for Contact-Rich Manipulation",
    year: 2023,
    badge: "IROS-W 2023",
    why: "Removes the need for a known 3D model or fiducial markers: the robot learns an object's shape, motion, and physical behaviour jointly from raw RGB-D video.",
    citations: 1,
    fig: "assets/img/pubs/instance-agnostic.png",
    figAlt: "Instance-agnostic geometry and contact dynamics learning pipeline.",
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2309.05832" }
    ]
  },
  {
    id: "swm2025",
    group: "workshop",
    title: "Fusing Vision and Contact-Rich Physics Improves Object Reconstruction Under Occlusion",
    authors: [
      { n: "Bibit Bianchini" }, { n: "Minghan Zhu" }, { n: "Mengti Sun", me: true },
      { n: "Bowen Jiang" }, { n: "Camillo J. Taylor" }, { n: "Michael Posa" }
    ],
    venue: "RSS Workshop on Structured World Models for Robotic Manipulation",
    year: 2025,
    badge: "RSS-W 2025",
    why: "",
    fig: "assets/img/pubs/swm2025.png",
    figAlt: "Vision and contact fusion for occluded object reconstruction.",
    links: [
      { label: "OpenReview", url: "https://openreview.net/forum?id=TvdtH06zlQ" }
    ]
  }
];

const PROJECTS = [
  {
    name: "AssistiveMouseTech",
    tagline: "Webcam hand-gesture cursor control for users with limited motor mobility — no specialized hardware beyond the camera already in a laptop.",
    detail: "Two independent tracking pipelines (MediaPipe and a lightweight OpenCV fallback), tremor-aware filtering, a state machine that suppresses accidental cursor motion, and 19,932 labeled gesture samples with reproducible accuracy benchmarks.",
    tech: ["Python", "C++", "OpenCV", "MediaPipe", "TensorFlow"],
    url: "https://github.com/mengtis/AssistiveMouseTech",
    meta: "Open source · MIT",
    fig: "assets/img/projects/assistivemouse.png",
    figAlt: "Hand gesture controlling a cursor via webcam."
  },
  {
    name: "cheetah-planning",
    tagline: "Trajectory playback for the MIT Mini Cheetah: converts TOWR trajectory-optimization output into inverse-dynamics feedforward plans the robot executes onboard.",
    detail: "The planning and deployment stack behind the CASE 2021 jumping work. LCM-based communication, Qt visualization, and cross-compilation for the physical robot.",
    tech: ["C++", "CMake", "Eigen", "LCM", "Qt", "Ipopt"],
    url: "https://github.com/mengtis/cheetah-planning",
    meta: "Open source · MIT",
    fig: "assets/img/projects/cheetah.png",
    figAlt: "MIT Mini Cheetah quadruped executing an optimized jump."
  },
  {
    name: "homebot-vla",
    tagline: "Vision-language-action models for household manipulation, bridging general-purpose robot policies and the contact-rich perception work above.",
    detail: "Ongoing independent research. Code release pending.",
    tech: ["Python", "PyTorch", "VLA"],
    url: null,
    meta: "In progress · code release pending",
    fig: "assets/img/projects/homebot.png",
    figAlt: "Household robot manipulation."
  }
];
