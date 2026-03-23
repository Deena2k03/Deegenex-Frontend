const departments = [
  {
    departmentName: "Development Services",
    services: [
      {
        title: "Web Development",
        description: "At DEEGENEX, we build powerful web platforms that don’t just look good — they perform, scale, and convert. From lightning-fast websites to complex web applications, we create digital systems engineered for speed, security, and serious growth. We turn ambitious ideas into high-impact digital products.",
        image: "/web-development1.png",
        highlights: [
          "High-performance business websites",
          "Scalable web apps with robust backend systems",
          "Conversion-focused e-commerce platforms",
          "Performance-optimized systems built to scale",
        ],
        metrics: [
          { percentage: 98, title: "Client Satisfaction", text: "Because performance and partnership matter." },
          { percentage: 95, title: "On-Time Delivery", text: "Fast execution without compromising quality." },
          { percentage: 100, title: "Secure & Scalable Architecture", text: "Built strong from day one." },
          { percentage: 96, title: "Performance Optimization Score", text: "Engineered for speed, stability, and scalability." },
        ],
      },

      {
        title: "Software Development",
        description: "At DEEGENEX, we design and develop custom software solutions that streamline operations, automate workflows, and accelerate business growth. From enterprise-grade systems to scalable cloud-based applications, we build secure, high-performance software engineered for reliability, flexibility, and long-term scalability.",
        image: "/software-dev.png",
        highlights: [
          "Workflow management & operational tools",
          "Business process automation systems",
          "Secure database architecture & backend systems",
          "API-driven integrations with third-party platforms",
        ],
        metrics: [
          { percentage: 97, title: "Client Retention Rate", text: "Trusted partnerships with lasting value" },
          { percentage: 94, title: "Faster Workflow Automation", text: "Reduced manual work, faster processes" },
          { percentage: 99, title: "Data Security & System Stability", text: "Advanced protection with structured architecture" },
          { percentage: 95, title: "Productivity Improvement", text: "Boosting efficiency across business operations" },
        ],
      },

      {
        title: "Mobile App Development",
        description: "At DEEGENEX, we design and develop high-performance mobile applications that deliver seamless user experiences across Android and iOS platforms. Our mobile app development services combine intuitive UI/UX design, powerful backend integration, and performance optimization to help businesses connect with users anytime, anywhere.",
        image: "/mobile-app.png",
        highlights: [
          "Cross-platform mobile applications",
          "Native Android & iOS app development",
          "E-commerce mobile apps",
          "Performance-optimized user experiences",
        ],
        metrics: [
          { percentage: 96, title: "User Satisfaction Rate", text: "Engaging apps designed for seamless experience." },
          { percentage: 93, title: "Faster App Performance", text: "Optimized for speed, responsiveness, and stability." },
          { percentage: 99, title: "Secure Mobile Architecture", text: "Advanced data protection and secure integrations." },
          { percentage: 92, title: "Higher User Retention", text: "Apps built to engage and retain users." },
        ],
      },

      {
        title: "API & Backend Systems",
        description: "At DEEGENEX, we build secure, scalable backend systems and powerful API architectures that connect your entire digital ecosystem. From custom server-side development to third-party integrations, we create structured backend infrastructures designed for performance, reliability, and seamless data flow.",
        image: "/api.png",
        highlights: [
          "Secure authentication & authorization systems",
          "Third-party API integrations (CRM, Payment, SaaS tools)",
          "Cloud-based backend architecture",
          "Database design & optimization",
        ],
        metrics: [
          { percentage: 98, title: "System Reliability Rate", text: "Stable backend systems with minimal downtime." },
          { percentage: 96, title: "Faster Data Processing", text: "Optimized APIs for smooth, real-time performance." },
          { percentage: 100, title: "Secure Data Transactions", text: "Advanced encryption and secure access protocols." },
          { percentage: 93, title: "Integration Efficiency", text: "Seamless connectivity across platforms and services." },
        ],
      }

    ],
  },

  {
    departmentName: "Digital Design & Product Innovation",
    services: [
      {
        title: "UI/UX Design",
        description: "At DEEGENEX, we craft intuitive, visually compelling, and user-focused digital experiences that drive engagement and conversions. Our UI/UX design services combine research-driven strategy, modern interface design, and seamless user journeys to ensure every interaction feels natural, efficient, and impactful.",
        image: "/ui-ux.png",
        highlights: [
          "User-centered website interface design",
          "Product design wireframes & prototypes",
          "Conversion-focused landing page designs",
          "Interaction design & user flow optimization",
        ],
        metrics: [
          { percentage: 98, title: "User Experience Satisfaction", text: "Designs that users love and trust." },
          { percentage: 94, title: "Improved User Engagement", text: "Interfaces built to retain and convert." },
          { percentage: 97, title: "Higher Conversion Impact", text: "Strategic design that drives measurable results." },
          { percentage: 92, title: "Usability Optimization Score", text: "Seamless navigation with frictionless interactions." },
        ],
      },

      {
        title: "Web & Mobile App UI Design",
        description: "At DEEGENEX, we design visually stunning and highly intuitive interfaces for web and mobile applications that elevate user engagement and brand perception. We combine modern UI aesthetics with user-focused design principles to create seamless digital experiences across devices.",
        image: "/we-app-uiux.png",
        highlights: [
          "Responsive web interface design",
          "Cross-platform mobile app UI systems",
          "Design systems for consistent branding",
          "Conversion-focused landing and dashboard layouts",
        ],
        metrics: [
          { percentage: 97, title: "Interface Consistency Score", text: "Unified design systems across platforms." },
          { percentage: 94, title: "Faster User Navigation", text: "Optimized layouts for smooth interaction flow." },
          { percentage: 93, title: "Increased User Retention", text: "Engaging designs that keep users returning." },
          { percentage: 98, title: "Visual Experience Rating", text: "Modern aesthetics backed by usability science." },
        ],
      },

      {
        title: "Product Design",
        description: "At DEEGENEX, we transform ideas into powerful, market-ready digital products. From concept validation to final interface execution, we design products that balance innovation, usability, and scalability. Our product design process focuses on solving real user problems while aligning with business goals — ensuring every feature delivers measurable value.",
        image: "/Product Design.png",
        highlights: [
          "Product strategy & concept validation",
          "Wireframing & interactive prototyping",
          "Scalable product architecture",
          "Market-ready UI systems",
        ],
        metrics: [
          { percentage: 96, title: "MVP Success Launch Rate", text: "Validated ideas turned into working products." },
          { percentage: 98, title: "Faster Time-to-Market", text: "Streamlined design process for rapid deployment." },
          { percentage: 96, title: "User Adoption Growth", text: "Products built around real user needs." },
          { percentage: 95, title: "Feature Optimization Efficiency", text: "Strategic feature prioritization for maximum impact." },
        ],
      },

      {
        title: "Design Systems & Prototyping",
        description: "At DEEGENEX, we build scalable design systems and interactive prototypes that bring clarity, consistency, and speed to product development. Our approach ensures every component, layout, and interaction follows a unified design language — reducing development friction and accelerating product launches.",
        image: "/Design Systems & Prototyping-Photoroom.png",
        highlights: [
          "Scalable component-based design systems",
          "UI libraries & reusable design frameworks",
          "High-fidelity product mockups",
          "Cross-team collaboration workflows",
        ],
        metrics: [
          { percentage: 96, title: "Design Consistency Accuracy", text: "Unified visual language across products." },
          { percentage: 98, title: "Faster Development Alignment", text: "Reusable systems reduce implementation time." },
          { percentage: 97, title: "Improved Team Collaboration", text: "Clear documentation and structured design workflows." },
          { percentage: 94, title: "Prototype Validation Success", text: "Tested concepts before full-scale development." },
        ],
      }

    ],
  },


  {
    departmentName: "Growth & Digital Marketing Services",
    services: [
      {
        title: "Search Engine Optimization (SEO)",
        description: "At DEEGENEX, we build data-driven SEO strategies that increase visibility, drive organic traffic, and generate measurable growth. Our approach combines technical SEO, keyword optimization, content strategy, and performance analysis to ensure your website ranks higher and attracts the right audience.",
        image: "/seo-Photoroom.png",
        highlights: [
          "Technical website SEO audits",
          "Keyword research & competitor analysis",
          "On-page & off-page optimization",
          "Content strategy & SEO copywriting",
        ],
        metrics: [
          { percentage: 98, title: "Organic Traffic Growth", text: "Consistent increase in qualified search visitors." },
          { percentage: 94, title: "Higher Search Visibility", text: "Improved rankings across competitive keywords." },
          { percentage: 97, title: "Technical SEO Optimization Score", text: "Faster, cleaner, and search-friendly architecture." },
          { percentage: 93, title: "Lead Generation Improvement", text: "SEO strategies built to convert traffic into business." },
        ],
      },

      {
        title: "Digital Marketing Strategy",
        description: "At DEEGENEX, we create powerful, data-driven digital marketing strategies designed to accelerate brand visibility, audience engagement, and revenue growth. We combine market research, competitor analysis, performance tracking, and multi-channel planning to build structured strategies that align with your business goals.",
        image: "/Digital Marketing Strategy-Photoroom.png",
        highlights: [
          "Multi-channel marketing roadmaps",
          "Audience targeting & segmentation",
          "Brand positioning & messaging frameworks",
          "ROI-focused growth planning",
        ],
        metrics: [
          { percentage: 96, title: "Campaign Performance Accuracy", text: "Strategic targeting with measurable results." },
          { percentage: 97, title: "Higher Audience Engagement", text: "Data-backed strategies that connect and convert." },
          { percentage: 93, title: "ROI Optimization Efficiency", text: "Maximized returns through structured execution." },
          { percentage: 95, title: "Growth Acceleration Impact", text: "Scalable strategies built for long-term expansion." },
        ],
      },

      {
        title: "Social Media Marketing",
        description: "At DEEGENEX, we build high-impact social media strategies that grow your brand, engage your audience, and drive measurable business results. From content creation to performance-driven campaigns, we combine creativity with analytics to ensure your brand stands out across platforms and converts attention into action.",
        image: "/Social Media Marketing-Photoroom.png",
        highlights: [
          "Social media content strategy & planning",
          "Paid social media advertising",
          "Audience targeting & engagement optimization",
          "Influencer & community collaboration strategies",
        ],
        metrics: [
          { percentage: 97, title: "Audience Engagement Growth", text: "VContent designed to attract and retain attention." },
          { percentage: 95, title: "Brand Visibility Increase", text: "Stronger reach across key social platforms." },
          { percentage: 94, title: "Campaign Optimization Efficiency", text: "Data-driven improvements for maximum impact." },
          { percentage: 95, title: "Conversion Growth from Social", text: "Turning followers into customers." },
        ],
      },

      {
        title: "Performance Marketing (Ads)",
        description: "At DEEGENEX, we create high-converting paid advertising campaigns that drive targeted traffic, qualified leads, and measurable revenue growth. Our performance marketing strategies focus on precision targeting, data-driven optimization, and ROI maximization across platforms like Google Ads, Meta Ads, and other digital channels.",
        image: "/Performance Marketing -Photoroom.png",
        highlights: [
          "Google Ads & Search Campaign Management",
          "Meta (Facebook & Instagram) Ad Campaigns",
          "Conversion Tracking & Analytics Setup",
          "Funnel Optimization & A/B Testing",
        ],
        metrics: [
          { percentage: 98, title: "ROI Optimization Accuracy", text: "Data-driven campaigns built for profitability." },
          { percentage: 96, title: "Higher Lead Conversion Rate", text: "Targeted ads that convert efficiently." },
          { percentage: 97, title: "Campaign Performance Improvement", text: "Continuous testing and optimization strategies." },
          { percentage: 93, title: "Cost-Per-Lead Reduction", text: "Smarter bidding and precise audience targeting." },
        ],
      }

    ],
  },

  {
    departmentName: "AI & Data Intelligence",
    services: [
      {
        title: "AI Customer Support",
        description: "At DEEGENEX, we build intelligent AI-powered customer support systems that automate conversations, resolve queries instantly, and enhance customer satisfaction. Our AI solutions use smart response systems, workflow automation, and seamless integrations to provide 24/7 support across websites, apps, and messaging platforms.",
        image: "/AI Customer Support -Photoroom.png",
        highlights: [
          "AI-powered website support chatbots",
          "Automated ticketing & query resolution systems",
          "Multi-platform chat integration (Web, WhatsApp, App)",
          "Smart escalation to human agents",
        ],
        metrics: [
          { percentage: 97, title: "Faster Query Resolution", text: "Instant responses powered by intelligent automation." },
          { percentage: 98, title: "Customer Satisfaction Improvement", text: "Seamless support experiences that build trust." },
          { percentage: 95, title: "Support Cost Reduction", text: "Automated workflows reduce manual overhead." },
          { percentage: 98, title: "24/7 Availability Efficiency", text: "Continuous support without downtime." },
        ],
      },

      {
        title: "Custom AI Software Development",
        description: "At DEEGENEX, we design and develop custom AI-powered software to solve complex business challenges and unlock intelligent automation. From machine learning models to AI-integrated enterprise systems, we build scalable, secure, performance-driven AI solutions that enhance decision-making, optimize operations, and create competitive advantage.",
        image: "/Custom AI Software Development-Photoroom.png",
        highlights: [
          "Custom machine learning model development",
          "AI-integrated business applications",
          "Predictive analytics & forecasting systems",
          "Intelligent workflow automation tools",
        ],
        metrics: [
          { percentage: 98, title: "Model Accuracy Optimization", text: "Precision-driven AI solutions for real-world impact." },
          { percentage: 95, title: "Operational Efficiency Gain", text: "Automation that reduces manual dependency." },
          { percentage: 96, title: "Faster Data Processing Speed", text: "AI systems built for real-time intelligence." },
          { percentage: 97, title: "Smarter Decision-Making Impact", text: "Data-driven insights that improve business outcomes." },
        ],
      },

      {
        title: "Intelligent Workflow Automation",
        description: "At DEEGENEX, we design intelligent workflow automation systems that eliminate repetitive tasks, streamline operations, and accelerate business efficiency. By combining smart logic, AI integration, and seamless system connectivity, we transform manual processes into automated.",
        image: "/Intelligent Workflow Automation-Photoroom.png",
        highlights: [
          "Business process automation systems",
          "AI-driven workflow orchestration",
          "Automated data processing pipelines",
          "Approval & task management automation",
        ],
        metrics: [
          { percentage: 96, title: "Process Efficiency Improvement", text: "Automated systems that save time and resources." },
          { percentage: 97, title: "Reduction in Manual Workload", text: "Streamlined operations with minimal human intervention." },
          { percentage: 98, title: "Faster Task Execution", text: "Optimized workflows for higher productivity." },
          { percentage: 95, title: "Operational Accuracy Enhancement", text: "Reduced errors through intelligent automation." },
        ],
      },

      {
        title: "AI System Integration",
        description: "At DEEGENEX, we seamlessly integrate AI capabilities into your existing systems, applications, and business workflows. Whether it’s embedding machine learning models, connecting AI APIs, or enhancing legacy platforms with intelligent automation, we ensure smooth implementation without disrupting your operations.",
        image: "/AI System Integration-Photoroom.png",
        highlights: [
          "AI API integration with web & mobile apps",
          "Third-party AI tool integration",
          "Cloud-based AI deployment",
          "Real-time data processing connections",
        ],
        metrics: [
          { percentage: 97, title: "Seamless Integration Success Rate", text: "Smooth AI adoption without operational disruption." },
          { percentage: 94, title: "Faster System Intelligence Upgrade", text: "Rapid enhancement of existing infrastructure." },
          { percentage: 95, title: "Secure AI Implementation", text: "Enterprise-grade security with stable architecture." },
          { percentage: 96, title: "Workflow Intelligence Enhancement", text: "Smarter systems driving better performance." },
        ],
      }

    ],
  },

      {
    departmentName: "Training & Internship Programs",
    services: [
      {
        title: "Python Development Training",
        description: "At DEEGENEX, we provide hands-on Python development training designed to build strong programming foundations and real-world problem-solving skills. Our training covers core Python concepts, data structures, automation, backend development, and practical project implementation — ensuring learners gain industry-ready expertise.",
        image: "/Python Development Training-Photoroom.png",
        highlights: [
          "Python fundamentals & advanced concepts",
          "Real-time coding exercises & mini projects",
          "Database integration & API handling",
          "Automation & scripting projects",
        ],
        metrics: [
          { percentage: 97, title: "Practical Skill Development Rate", text: "Hands-on learning for real-world readiness." },
          { percentage: 98, title: "Student Project Completion Success", text: "Structured guidance from concept to deployment." },
          { percentage: 95, title: "Faster Coding Confidence Growth", text: "Problem-solving through continuous practice." },
          { percentage: 93  , title: "Career Readiness Improvement", text: "Training aligned with industry requirements." },
        ],
      },

      {
        title: "Full Stack Development Training",
        description: "At DEEGENEX, we provide hands-on Full Stack Development training designed to turn beginners into job-ready developers. Our program covers frontend, backend, databases, APIs, and deployment — giving learners complete end-to-end development expertise. We focus on practical learning, real-time projects, and industry-aligned skills.",
        image: "/Full Stack Development Training-Photoroom.png",
        highlights: [
          "Modern frontend frameworks (React / Next.js basics)",
          "Backend development & API creation",
          "Authentication & real-world project building",
          "Deployment & production-level workflow",
        ],
        metrics: [
          { percentage: 98, title: "Practical Development Exposure", text: "Real-world projects for hands-on experience." },
          { percentage: 95, title: "Project Completion Success", text: "Guided development from start to deployment." },
          { percentage: 100, title: "Technical Skill Improvement", text: "Structured learning with progressive difficulty." },
          { percentage: 98, title: "Job-Ready Skill Enhancement", text: "Industry-focused training aligned with hiring standards." },
        ],
      },

      {
        title: "Web Development Training",
        description: "At DEEGENEX, we provide practical Web Development training designed to build strong technical foundations and real-world project experience. Our program covers frontend development, responsive design, backend basics, and deployment workflows — helping learners create fully functional websites and web applications with confidence.",
        image: "/Web Development Training-Photoroom.png",
        highlights: [
          "HTML, CSS & JavaScript fundamentals",
          "Responsive & mobile-first design",
          "Real-time project development",
          "Industry-oriented coding practices",
        ],
        metrics: [
          { percentage: 96, title: "Hands-On Learning Experience", text: "Project-based training with practical exposure." },
          { percentage: 97, title: "Website Development Completion Rate", text: "From concept to fully functional deployment." },
          { percentage: 100, title: "Skill Confidence Growth", text: "Structured learning with real coding challenges." },
          { percentage: 98, title: "Career Skill Readiness", text: "Training aligned with current industry demands." },
        ],
      },

      {
        title: "AI & Analytics Basics",
        description: "At DEEGENEX, we introduce learners to the foundations of Artificial Intelligence and Data Analytics through practical, easy-to-understand training. Our program covers core AI concepts, data fundamentals, basic machine learning ideas, and real-world analytics applications.",
        image: "/ai-training-Photoroom.png",
        highlights: [
          "Introduction to AI & Machine Learning concepts",
          "Data analysis fundamentals",
          "Basic Python for AI & analytics",
          "Real-world AI use cases",
        ],
        metrics: [
          { percentage: 97, title: "Concept Clarity Improvement", text: "Strong foundation in AI fundamentals." },
          { percentage: 96, title: "Practical Understanding Growth", text: "Hands-on exercises for real insight." },
          { percentage: 95, title: "Analytical Thinking Development", text: "Structured learning for data-driven mindset." },
          { percentage: 98, title: "Future-Ready Skill Awareness", text: "Industry-aligned introduction to AI & analytics." },
        ],
      }

    ],
  }

];

export default departments;
