const coreRegionsConfig = {
    "shexian": { name: "歙县" },
    "xiuning": { name: "休宁" },
    "yixian":  { name: "黟县" },
    "jixi":    { name: "绩溪" },
    "wuyuan":  { name: "婺源" },
    "qimen":   { name: "祁门" }
};

// 周边地区数据
const contextRegionsConfig = {
    "quzhou": { name: "衢州府" },
    "yanzhou": { name: "严州府" },
    "hangzhou": { name: "杭州府" },
    "ningguo": { name: "宁国府" },
    "guangxin": { name: "广信府" },
    "chizhou": { name: "池州府" },
    "raozhou": { name: "饶州府" }
};

// 预构件数据，模拟方案中的 JSON 结构
const huizhouData = {
    "shexian": { 
        title: "歙县·徽州府衙", subtitle: "Huizhou Prefecture Yamen", seal: "官衙", 
        dynasty: "明弘治年间", desc: "依山就势，粉墙黛瓦。建筑群采用轴线对称布局，展现了古代徽州成熟的砖木结构技艺，以及森严的封建礼制思想。作为古徽州的政治中心，其仪门、大堂等建筑保留了原汁原味的官式营造特征。",
        chart: [50, 30, 20]
    },
    "xiuning": { 
        title: "休宁·承启堂", subtitle: "Chengqi Hall, Xiuning", seal: "民居", 
        dynasty: "清乾隆年间", desc: "位于黄村，是典型的徽派古民居。宅内四水归堂的布局巧妙调和了采光与风水，精美的木雕牛腿讲述着休宁商人“贾而好儒”的历史渊源。",
        chart: [70, 20, 10]
    },
    "yixian":  { 
        title: "黟县·宏村月沼", subtitle: "Moon Lake, Hongcun Village", seal: "民居", 
        dynasty: "明永乐年间", desc: "宏村的牛形水系工程是徽州先民理水的巅峰之作。月沼作为半月形的中心水池，四周马头墙倒映水中，展现了中国传统“天人合一”的审美意境。",
        chart: [60, 25, 15]
    },
    "jixi":    { 
        title: "绩溪·胡氏宗祠", subtitle: "Hu Family Ancestral Hall", seal: "宗祠", 
        dynasty: "明嘉靖年间", desc: "以木雕艺术闻名于世，被称为“木雕艺术博物馆”。其门楼、享堂及寝室的构件雕琢细腻，不仅是宗族礼制的空间载体，也是徽派雕刻技艺的集大成者。",
        chart: [85, 10, 5]
    },
    "wuyuan":  { 
        title: "婺源·彩虹桥", subtitle: "Rainbow Bridge, Wuyuan", seal: "桥梁", 
        dynasty: "南宋", desc: "古徽州最古老、最长的廊桥。建于清水的清华村，采用半船形桥墩设计以减轻洪水冲击，体现了极高的实用主义与古典结构美学的结合。",
        chart: [40, 0, 60] // 木、砖、石
    },
    "qimen":   { 
        title: "祁门·古戏台", subtitle: "Ancient Stage, Qimen", seal: "宗祠", 
        dynasty: "明清时期", desc: "散落于祁门各村落的古戏台，通常与宗祠结合。它们不仅是祭祀与娱乐的中心，其华丽的藻井和出挑的飞檐，正是徽派建筑极致繁华的缩影。",
        chart: [75, 15, 10]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const svgWrapper = document.getElementById("svg-wrapper");
    const introSection = document.getElementById("intro-section");
    const infoCard = document.getElementById("info-card");
    const closeBtn = document.getElementById("close-btn");

    fetch('./map.svg')
        .then(response => response.text())
        .then(svgContent => {
            svgWrapper.innerHTML = svgContent;
            const svgElement = svgWrapper.querySelector('svg');
            
            if(svgElement) {
                // 清理掉原SVG内可能存在的干扰class，确保CSS接管颜色
                const paths = svgElement.querySelectorAll("path");
                paths.forEach(p => p.removeAttribute("class"));

                // 遮掉被 viewBox 裁切出来的最外圈描边，避免出现整图方框感
                addViewportEdgeMask(svgElement);
                
                generateLabels(svgElement);
                setupInteractions();
            }
        });

    function addViewportEdgeMask(svgElement) {
        const vb = svgElement.viewBox && svgElement.viewBox.baseVal;
        const width = vb && vb.width ? vb.width : 757.5;
        const height = vb && vb.height ? vb.height : 821;
        const thickness = 2.5;
        const bgColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--bg-color")
            .trim() || "#F4F4F0";

        const maskGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        maskGroup.setAttribute("id", "viewport-edge-mask");
        maskGroup.setAttribute("pointer-events", "none");

        const rectDefs = [
            { x: -thickness, y: -thickness, width: width + thickness * 2, height: thickness * 2 },
            { x: -thickness, y: height - thickness, width: width + thickness * 2, height: thickness * 2 },
            { x: -thickness, y: -thickness, width: thickness * 2, height: height + thickness * 2 },
            { x: width - thickness, y: -thickness, width: thickness * 2, height: height + thickness * 2 }
        ];

        rectDefs.forEach(def => {
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", def.x);
            rect.setAttribute("y", def.y);
            rect.setAttribute("width", def.width);
            rect.setAttribute("height", def.height);
            rect.setAttribute("fill", bgColor);
            maskGroup.appendChild(rect);
        });

        svgElement.appendChild(maskGroup);
    }

    function setupInteractions() {
        // 关闭按钮逻辑
        closeBtn.addEventListener("click", () => {
            infoCard.classList.add("hidden");
            introSection.classList.remove("hidden");
            
            // 恢复所有区域样式
            Object.keys(coreRegionsConfig).forEach(id => {
                const el = document.getElementById(id);
                if(el) { el.style.opacity = '1'; }
            });
            // 恢复试图缩放
            svgWrapper.style.transform = "scale(1) translate(0, 0)";
        });

        Object.keys(coreRegionsConfig).forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            el.addEventListener("click", (e) => {
                // 1. 面板切换
                introSection.classList.add("hidden");
                infoCard.classList.remove("hidden");

                // 2. 更新数据
                updateCardInfo(id);

                // 3. 产生聚焦的视图缩放（模拟下钻视角）
                // 简单地放大 SVG wrapper 并居中
                svgWrapper.style.transform = "scale(1.15) translateX(5%)";

                // 4. 其他没选中的区域变暗
                Object.keys(coreRegionsConfig).forEach(otherId => {
                    const otherEl = document.getElementById(otherId);
                    if (otherEl) {
                        otherEl.style.opacity = (otherId === id) ? '1' : '0.3';
                    }
                });
            });
        });
    }

    function updateCardInfo(id) {
        const data = huizhouData[id];
        if(!data) return;
        document.getElementById("card-county-seal").src = `./seal/${id}.png`;        document.getElementById("card-title").textContent = data.title;
        document.getElementById("card-subtitle").textContent = data.subtitle;
        document.getElementById("card-dynasty").textContent = data.dynasty;
        document.getElementById("card-desc").textContent = data.desc;

        // 更新进度条数据动画
        const fills = document.querySelectorAll(".bar-fill");
        if(fills.length >= 3) {
            fills[0].style.width = '0%'; fills[1].style.width = '0%'; fills[2].style.width = '0%';
            setTimeout(() => {
                fills[0].style.width = data.chart[0] + '%';
                fills[1].style.width = data.chart[1] + '%';
                fills[2].style.width = data.chart[2] + '%';
            }, 100);
        }
    }

    // 绘制标签 (原有逻辑简化版)
    function generateLabels(svgElement) {
        // 首先绘制背景地名，不抢核心地界风头
        Object.keys(contextRegionsConfig).forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const bbox = el.getBBox();
            
            let x = bbox.x + bbox.width / 2;
            let y = bbox.y + bbox.height / 2;

            if (id === 'raozhou') {
                x -= 75;
            }

            const textHTML = `<text x="${x}" y="${y}" class="context-text svg-label" text-anchor="middle" dominant-baseline="central">${contextRegionsConfig[id].name}</text>`;
            // 将周边地名的标注放在最后，避免被地块的 fill 遮挡
            svgElement.insertAdjacentHTML('beforeend', textHTML); 
        });

        // 绘制一府六县地名
        Object.keys(coreRegionsConfig).forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const bbox = el.getBBox();
            
            let x = bbox.x + bbox.width / 2;
            let y = bbox.y + bbox.height / 2;
            // 微调祁门位置
            if (id === 'qimen') {
                x += 20;
                y += 10;
            }

            const textHTML = `<text x="${x}" y="${y}" class="core-text svg-label" text-anchor="middle" dominant-baseline="central">${coreRegionsConfig[id].name}</text>`;
            svgElement.insertAdjacentHTML('beforeend', textHTML);
        });
    }
});
