const { createApp, defineComponent, ref, watch, onMounted, computed } = Vue;

const vAbout = defineComponent({
  template: `
    <div className="content-section" id="about">
      <div class="about-img">
        <img src="./static/img/icon.jpg" alt="My Icon" id="my-info-icon"/>
      </div>
      <div class="self-introduction">
        <h1>Yang Yupeng</h1>
        <h2>I'm </h2>
        <h2 class="gradient-text">{{ typedText1 }}</h2>  
        
        <h3 v-if="showSpecializing">specializing in</h3>  
        <h2 v-if="showSpecializing" class="gradient-text">{{ typedText2 }}</h2>  
        
        <div class="btn-container">
          <el-button 
            size="large" 
            type="success"
            @click="openMyPage"
            round
          >
            <p>Buy me A Coffee</p>
          </el-button>
        </div>
      </div>
    </div>
  `,
  setup() {
    const openMyPage = () => {
      window.open("https://www.paypal.com/paypalme/Yupeng2905", "_blank");
    };

    const text1 = "AI Programmer & Full-Stack Developer & Computational Architectural Designer";
    const text2 = "Deep Learning & Generative AI & Architectural Computing";
    const typedText1 = ref("");
    const typedText2 = ref("");
    const showSpecializing = ref(false); // 控制 `<h3>` 是否显示

    const typeText = (text, targetRef, speed = 100, callback = null) => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          targetRef.value += text[index];
          index++;
        } else {
          clearInterval(interval);
          if (callback) callback();
        }
      }, speed);
    };

    onMounted(() => {
      typeText(text1, typedText1, 20, () => {
        setTimeout(() => {
          showSpecializing.value = true; // 第二行打字前,, 才让 `<h3>` 出现
          typeText(text2, typedText2, 20);
        }, 100);
      });
    });

    return {
      openMyPage,
      typedText1,
      typedText2,
      showSpecializing, // 控制 `<h3>` 何时显示
    };
  }
});



const vSkill = defineComponent({
  template: `
    <div class="content-section" id="skill">
      <div class="skills-container">
        <h2 class="gradient-text">My Skills</h2>
        <el-divider />

        <div class="mainsub-skills-map">
          <div v-for="(skillCategory, key, index) in mySkills" :key=index class="skill-category-container">
            <div class="main-skill-map">
              <img :src="'./static/img/' + skillCategory.img" alt="Skill Category"  class="main-skill-category-icon"/>
              <h4>{{ formatCategoryName(key) }}</h4>
            </div>
            <el-divider />
            
            <div v-for="(subSkillInfo, key, index) in skillCategory.skills" :key=index class="sub-skill-map">
              <img :src="'./static/img/' + subSkillInfo[0]" alt="Skill Category"  class="sub-skill-category-icon"/>
              <h5>{{ key.replace('sharp', '#') }}</h5>
              <h6><i>{{ subSkillInfo[1] }}<i></h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  setup() {
    const mySkills = ref({
      ProgrammingLanguages: {
        img: "programming.png",
        skills: {
          Python: ["python.png", "Main Language"],
          Javascript: ["javascript.jpg", "Main Language"],
          Typescript: ["typescript.jpg", "Secondary Language"],
          Csharp: ["csharp.png", "Secondary Language"]
        }
      },
      FrontEnd: {
        img: "frontend.png",
        skills: {
          HTML: ["html.png", "Markup Language"],
          CSS: ["css.png", "Stylesheet Language"],
          VUE: ["vue.png", "JS UI Framework"],
          ThreeJs: ["threejs.png", "Web-based 3D Rendering"],
          ElementPlus: ["element-plus.png", "Vue UI Component"]
        }
      },
      BackEnd: {
        img: "backend.png",
        skills: {
          FastAPI: ["fast-api.png", "Python Web Framework"],
          Flask: ["flask.png", "Python Web Framework"]
        }
      },
      DeepLearning: {
        img: "ai.png",
        skills: {
          Pytorch: ["pytorch.png", "Deep Learning Framework"],
          Tensorflow: ["tensorflow.png", "Deep Learning Framework"],
          HuggingFace: ["huggingface.png", "Pre-trained AI model library"]
        }
      },
      ArchitecturalComputingDataAndVisualization: {
        img: "architectural-analysis.png",
        skills: {
          IfcOpenShell: ["ifc-open-shell.png", "Pyhon BIM Data Processing Library"],
          VTK: ["vtk.png", "Pyhon 3D Rendering & Visualization"],
          Rhino3dmJS: ["rhino.png", "Web-based Rhino 3D Library"],
          IfcJS: ["ifc-js.png", "Web-based IFC 3D Visualization"],
          Ladybug: ["ladybug.png", "Python Building Environment Analysis Library"],
          Honeybee: ["honeybee.png", "Python Building Energy Analysis Library"]
        }
      },
      GeometricComputation: {
        img: "geometry-analysis.png",
        skills: {
          Shapely: ["shapely.png", "Pyhon Geometric Computation Library"]
        }
      },
      OtherComputingDataAndVisualization: {
        img: "data-analysis.png",
        skills: {
          Numpy: ["numpy.png", "Numerical Computation"],
          Pandas: ["pandas.png", "Data Processing & Analysis"],
          Matplotlib: ["matplotlib.png", "Data Visualization"]
        }
      }
    });
    const formatCategoryName = (name) => {
      return name
        .replace(/([A-Z])/g, "-$1") // 在大写字母前加 `-`
        .replace(/^-/, "") // 去掉开头的 `-`
        .replace(/^./, (str) => str.toUpperCase()) // 仅首字母大写
        .replace(/-And-/gi, " & "); // 把 "-And-" 替换成 " & "
    };
    

    return {
      mySkills,
      formatCategoryName,
    }
  }
});

const vProject = defineComponent({
  template: `
    <el-carousel-item>
      <div class="project-container">
        <h2 class="gradient-text">{{ title }}</h2>
        <div class="project-skills-container">
          <div v-for="(item, index) in skills" :key="index" class="project-skills-map">
            <img :src="'./static/img/' + item.img" alt="Skill Category" class="sub-skill-category-icon" />
            <h4>{{ item.name }}</h4>
          </div>
        </div>
        <pre><p><i>{{ description }}</i></p></pre>
        <video v-if="video" :src="'./static/videos/' + video" type="video/mp4" autoplay muted loop controls></video>
        <img v-else-if="img" :src="'./static/img/' + img" alt="Project & Research Image" class="research-img"/>
      </div>
    </el-carousel-item>
  `,
  props: {
    title: {
      type: String,
      required: true,
      default: "Title"
    },
    skills: {
      type: Array,
      required: true,
      default: () => []
    },
    description: {
      type: String,
      required: true,
      default: "Description"
    },
    video: {
      type: String,
      required: false,
      default: "video.mp4"
    },
    img: {
      type: String,
      required: false,
      default: "image.png"
    }
  }
});

const vContent = defineComponent({
  template: `
  <div class="content-section" id="research">
    <el-carousel 
      motion-blur
      :autoplay="false"
    >
      <v-project
        v-for="(project, index) in projects"
        :key="index"
        :title="project.title"
        :skills="project.skills"
        :description="project.description"
        :video="project.video"
        :img="project.img"
      />
    </el-carousel>
  </div>
  `,
  components: {
    "v-project": vProject
  },
  setup() {
    const projects = ref([
      {
        title: "Project 1: Parking Generation Based on Genetic Algorithm",
        description: `
          이 프로젝트는 프론트엔드(Front-end)와 백엔드(Back-end) 분리를 채택하여, 한국 주차 관련 법규, 대지 정보 및 건축 정보 등을을 기반으로 
          유전 알고리즘(Genetic Algorithm)을 활용해 자동으로 최적화하여 효율적이고 규범적인 주차 계획을 생성하는 것이다. 사용자는 주소를 검색하여 
          대지 정보를 얻고, IFC 파일을 업로드하여 건물 정보를 얻고, 건물 위치를 확인악한 한국 주차 규정에 따라 주차 계획을 자동으로 생성할 수 있다.
        `,
        skills: [
          { name: "VUE.js", img: "vue.png" },
          { name: "Element Plus", img: "element-plus.png" },
          { name: "IFC.js", img: "ifc-js.png" },
          { name: "KakaoAPI", img: "kakao.png" },
          { name: "FastAPI", img: "fast-api.png" },
          { name: "Shapely", img: "shapely.png" },
          { name: "Numpy", img: "numpy.png" },
        ],
        video: "parking.mp4",
      },
      {
        title: "Project 2: IFC Web Viewer",
        description: `
          이 프로젝트는 건축 정보 모델링(BIM)의 경량화 시각화를 위해 설계된 웹 기반 IFC 파일 뷰어이다. 사용자는 IFC 파일을 업로드하고, 실시간으로 
          3D 모델을 확인하며, 인터랙티브 인터페이스를 통해 객체 속성을 조회할 수 있다. 주요 기능으로는 그리드 표시, 요소 강조, 배경 전환, 카메라 뷰 조정, 
          건축 구성 요소의 선택 및 위치 지정이 포함된다. 미래 분석 기능을 향상시키기 위해 일부 머신 러닝 콘텐츠가 추가될 수도 있다.
        `,
        skills: [
          { name: "VUE.js", img: "vue.png" },
          { name: "Element Plus", img: "element-plus.png" },
          { name: "Three.js", img: "threejs.png" },
          { name: "IFC.js", img: "ifc-js.png" },
          { name: "Flask", img: "flask.png" }
        ],
        video: "ifc-web-viewer.mp4",
      },
      {
        title: "Project 3: Web application for Building Environment Simulation based on Ladybug Tools (Ongoing)",
        description: `
          이 프로젝트도 프론트엔드(Front-end)와 백엔드(Back-end) 분리를 채택하여, 건축 성능 분석을 위한 경량화된 온라인 솔루션을 제공하는 것을 목표로 한다.
          이 프로젝트는 전세계 기상데이터 다운로드 기능을 이미 구현하였으며, 기상데이터와 사용자가 업로드한 건축모델을 기반으로 일조, 채광 등 
          건축성능을 시뮬레이션 및 분석 기능을 아직 완성되지 않았다.
          (너무 바빠서 시간이 없다).
        `,
        skills: [
          { name: "VUE.js", img: "vue.png" },
          { name: "Element Plus", img: "element-plus.png" },
          { name: "Three.js", img: "threejs.png" },
          { name: "Rhino3dm.js", img: "rhino.png" },
          { name: "IFC.js", img: "ifc-js.png" },
          { name: "FastAPI", img: "fast-api.png" },
          { name: "Ladybug", img: "ladybug.png" },
          { name: "Honeybee", img: "honeybee.png" },
        ],
        video: "ladybug.mp4",
      },
      {
        title: "Research 1: Research on Building Facade Generation Using LoRA Algorithm Based on Stable Diffusion",
        description: `
        본 연구는 AI 기반 최신 기술을 활용하여 가변형 모듈러 건축물의 렌더링 품질과 입면 디자인 효율성을 향상하는 것을 목표로 한다. 이를 위해 Stable Diffusion, 
        ControlNet, LoRA와 같은 AI 기술을 통해 초기 디자인을 시각화하고 다양한 디자인 옵션을 신속하게 생성 및 조정하는 방법을 탐구하였다. 평면 계획은 기존 설계 방식을 따르고, 
        입면 계획에는 AI 기술을 적용하였다.
        먼저 모듈러 주택의 기본 평면을 초안으로 설계하고 간단한 3D 매스를 만들어 공간의 형태와 구조적 요소를 정의하여 기본 디자인을 완성했다. 이후 입면 디자인 단계에서 반복적인 
        재질 매핑 작업을 AI 기술로 대체하여, 간단한 3D 매스에 AI를 활용해 신속하게 입면 디자인을 진행했다.
        `,
        skills: [
          {name: "Numpy", img: "numpy.png"},
          {name: "Pandas", img: "pandas.png"},
          {name: "Pytorch", img: "pytorch.png"},
          {name: "Matplotlib", img: "matplotlib.png"},
          {name: "Hugging Face", img: "huggingface.png"},
        ],
        video: '',
        img: "lora.png"
      },
    ]);

    return {
      projects,
    }
  }
});


const vFuture = defineComponent({
  template: `
    <div class="content-section" id="future">
      <svg 
        :viewBox="'0 0 ' + svgSize + ' ' + svgSize" 
        :width="svgSize" 
        :height="svgSize" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class="petals">
          <path 
            v-for="(angle, index) in petalsAngles" 
            :key="index"
            :d="'M' + originPoint + ',' + originPoint + 
                ' C' + (originPoint + petalOffset) + ',' + (originPoint - petalHeight) + 
                ' ' + (originPoint + petalWidth) + ',' + (originPoint - petalHeight * 0.8) + 
                ' ' + (originPoint + petalWidth * 1.2) + ',' + (originPoint - petalHeight * 0.4) + 
                ' C' + (originPoint + petalWidth * 1.5) + ',' + (originPoint + petalHeight * 0.2) + 
                ' ' + (originPoint + petalWidth * 0.8) + ',' + (originPoint + petalHeight * 0.5) + 
                ' ' + originPoint + ',' + originPoint + ' Z'"
            :fill="petalsColors[index]"
            :transform="'rotate(' + angle + ',' + originPoint + ',' + originPoint + ')'"
            class="petal"
          />
        </g>

        <circle 
          :cx="originPoint" 
          :cy="originPoint" 
          :r="circleR" 
          fill="grey"
        />
        

        <foreignObject 
          :x="originPoint - petalsForeignObjectSize/2" 
          :y="originPoint + - petalsForeignObjectSize/2" 
          :width="petalsForeignObjectSize" 
          :height="petalsForeignObjectSize"
        >
          <div class="center-text-container">
            <div
              v-for="(item, index) in petalInfo" 
              :key="index"
              :class="'petal-text-map petal-' + index"
            >
              <img :src=" './static/img/' + item.img" alt="" />
              <h2>{{ item.text }}</h2>
            <div>
          </div>
        </foreignObject>

        <foreignObject 
          :x="originPoint - centerForeignObjectSize/2" 
          :y="originPoint + - centerForeignObjectSize/2" 
          :width="centerForeignObjectSize" 
          :height="centerForeignObjectSize"
        >
          <div class="center-text-container">
            <h2>Future</h2>
          </div>
        </foreignObject>

      </svg>
    </div>
  `,
  props: {

  },

  setup(props) {
    const svgSize = ref(800);
    const originPoint = computed(() => svgSize.value / 2);

    const petalsAngles = ref([0, 60, 120, 180, 240, 300]);
    const petalsColors = ref(["#1F77B4", "#A6194B", "#F39C12", "#D9534F", "#662D91", "#17BECF"]);
    const petalWidth = computed(() => svgSize.value * 0.25);
    const petalHeight = computed(() => svgSize.value * 0.2);
    const petalOffset = computed(() => svgSize.value * 0.02);
    const circleR = ref(60);

    
    const centerForeignObjectSize = ref(100);
    const petalsForeignObjectSize = ref(350);
    

    const petalInfo = ref([
      {img: "energyplus-py.png", text: "EnergyPlus Python"},
      {img: "hvac_sizing.png", text: "HVAC"},
      {img: "OpenFoam.png", text: "OpenFoam + CFD"},
      {img: "openstudio.png", text: "Open Studio"},
      {img: "netural.png", text: "Deepl Learning"},
      {img: "ladybug.png", text: "Ladybug Python"},
    ]);

    return {
      svgSize,
      originPoint,
      petalsAngles,
      petalsColors,
      petalWidth,
      petalHeight,
      petalOffset,
      circleR,
      centerForeignObjectSize,
      petalsForeignObjectSize,
      petalInfo 

    };
  }
});


const app = createApp({
  components: {
    "v-about": vAbout,
    "v-skill": vSkill,
    "v-content": vContent,
    "v-future": vFuture,
  },
  setup() {
    const myInfos = ref([
      { name: "About Me", section: "about" },
      { name: "My Skills", section: "skill" },
      { name: "Projects & Research", section: "research" },
      { name: "Future", section: "future" }
    ]);

    const isDarkModel = ref(true);
    const githubIconSrc = ref("./static/img/github-mark-white.png");
    const activeColor = ref("#fff");
    watch(isDarkModel, () => {
      if (isDarkModel.value) {
        document.documentElement.classList.add("dark");
        githubIconSrc.value = "./static/img/github-mark-white.png";
        activeColor.value = "#fff";
      } else {
        document.documentElement.classList.remove("dark");
        githubIconSrc.value = "./static/img/github-mark.png";
        activeColor.value = "#000";
      }
    })

    const currentSection = ref("about");
    const handleClick = (section) => {
      currentSection.value = section; // 更新高亮的导航项
      const element = document.getElementById(section);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // 平滑滚动到该内容块
      }
      
      setTimeout(() => {
        if (section === "future") {
          const petals = element.querySelectorAll(".petal");
          petals.forEach((petal) => petal.classList.remove("active"));
        }

        element.classList.remove("active"); // 先移除
        setTimeout(() => {
          element.classList.add("active"); // 再添加
          if (section === "future") {
            const petals = element.querySelectorAll(".petal");
            petals.forEach((petal) => petal.classList.add("active"));
          }
        }, 50); // 50ms 之后重新添加，确保动画重新执行
      }, 10); // `scrollIntoView` 需要一定时间，等滚动结束再执行

    };


    const updateRouterHeight = () => {
      const router = document.querySelector(".router-container");

      if (router) {
        document.documentElement.style.setProperty("--router-height", `${router.offsetHeight}px`);
      }
    };

    const updateCurrentSection = () => {
      const sections = document.querySelectorAll(".content-section"); // 选择所有 `section`
      
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSection.value = entry.target.id; // 当 `section` 进入视图时，更新 `currentSection`
            if (entry.target.id === "future") {
              const petals = entry.target.querySelectorAll(".petal");
              petals.forEach((petal) => petal.classList.add("active"));
            }
            entry.target.classList.add("active"); // 添加动画类
          } else {
            if (entry.target.id === "future") {
              const petals = entry.target.querySelectorAll(".petal");
              petals.forEach((petal) => petal.classList.remove("active"));
            }
            entry.target.classList.remove("active");
          }
        });
      }, {
        root: null, // 监听整个视口
        threshold: 0.6, // 当 `section` 百分比 进入视图时触发
      });
    
      sections.forEach((section) => observer.observe(section)); // 监听每个 `section`
    };



    onMounted(() => {
      updateRouterHeight();
      window.addEventListener("resize", updateRouterHeight);
      updateCurrentSection();
    });

    return {
      myInfos,
      currentSection,
      isDarkModel,
      githubIconSrc,
      activeColor,
      handleClick,
    }
  },
});

app.use(ElementPlus);
app.mount("#app");
