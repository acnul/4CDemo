const coreRegionsConfig = {
    "shexian": { name: "歙县" },
    "xiuning": { name: "休宁" },
    "yixian":  { name: "黟县" },
    "jixi":    { name: "绩溪" },
    "wuyuan":  { name: "婺源" },
    "qimen":   { name: "祁门" }
};

// 随机点的数据类别和生成的占位池
const archCategories = [
    { type: "residence", name: "民居", icon: "./icon/dwelling.svg" },
    { type: "office", name: "官府", icon: "./icon/gov.svg" },
    { type: "bridge", name: "桥梁", icon: "./icon/bridge.svg" },
    { type: "shrine", name: "宗祠", icon: "./icon/gov.svg" }
];
const bgArchData = {};

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

// 首页装饰背景图配置
const bgDecorationConfig = {
    scale: 1.5,
    centerX: 420,
    centerY: 410,
    baseWidth: 900,
    baseHeight: 900
};

// 建筑图片缓存：存储已处理的透明PNG数据
const architectureImageCache = {};

// 预构件数据
const huizhouData = {
    "shexian": { 
        title: "歙县", subtitle: "Shexian County", seal: "地域",
        dynasty: "秦置歙县", desc: "歙县，古徽州政治、经济与文化之绝对中枢。作为长达千余年的徽州府治所在地，其境内的建筑营造深刻烙印着森严的官方礼制与高等级的形制规范。从气象庄严的徽州府衙，到彰显宗族功名的棠樾牌坊群，再到扼守新安江水运咽喉的渔梁坝，歙县的建筑不仅是砖木石的组合，更是古代封建政权与徽商资本在皖南地理空间上的权力折射与秩序构建。",
        chart: [40, 30, 30]
    },
    "xiuning": {
        title: "休宁", subtitle: "Xiuning County", seal: "地域",  
        dynasty: "东汉建县", desc: "休宁，居新安江之首，素享“中国第一状元县”之隆誉。鼎盛的科举文风与繁荣的商道水网，在此交织出了极为丰富的建筑肌理。有别于府城的庄严肃穆，休宁的营造更显露着深厚的人文烟火气息。从黄村等古村落的粉墙黛瓦与错落天井，到万安老街沿江逶迤的商铺民居，休宁的建筑生动诠释了徽州先民如何在市井商贸与儒家耕读之间，寻得最平衡的人居空间尺度。",
        chart: [60, 20, 20]
    },
    "yixian":  {
        title: "黟县", subtitle: "Yixian County", seal: "地域",
        dynasty: "秦建置", desc: "黟县，深藏于皖南群山腹地，其建筑遗产是古人探寻天人合一人居环境的极高境界。以宏村、西递为代表的传统聚落，并未采用死板的几何对称，而是因地制宜，创造出令人惊叹的“仿生学”理水网络。其引水入村、穿堂过院的精密人工水系，不仅解决了古代村落的消防与生活用水，更在空间布局上将“背山面水”的风水理念转化为科学的生态营建算法，堪称世界人居史上的杰作。",
        chart: [50, 30, 20]
    },
    "jixi":    {
        title: "绩溪", subtitle: "Jixi County", seal: "地域",
        dynasty: "唐大历元年", desc: "绩溪，扼守徽杭古道之要冲，素有“邑小士多”之誉。受制于“八山一水一分田”的严苛地形，绩溪先民将家族的生存与繁衍寄托于极其严密的宗族聚落营建之中。境内的龙川村等传统村落，以精妙的理水布局与群山共生。其极具代表性的胡氏宗祠，更将徽派木雕的镂空与浮雕技艺推向极致，堪称徽州宗族社会与精微建筑工艺完美交融的立体空间典范。",
        chart: [65, 20, 15]
    },
    "wuyuan":  {
        title: "婺源", subtitle: "Wuyuan County", seal: "地域", 
        dynasty: "唐开元二十八年", desc: "婺源，古徽州一府六县之南大门。这里水网密布、溪流纵横，特殊的水文地貌催生了极其发达的桥梁建筑体系。境内星罗棋布的廊桥（如彩虹桥）与石拱桥，犹如地理空间的针脚，将隔水相望的村落与商道紧密缝合。高低错落的马头墙与跨水而居的建筑群，在此与自然山水达成了极其微妙的平衡，共同绘就了一幅水陆交织、风土交融的徽州人居宏大画卷。",      
        chart: [45, 10, 45]
    },
    "qimen":   {
        title: "祁门", subtitle: "Qimen County", seal: "地域",
        dynasty: "唐武德五年", desc: "祁门，地处古徽州最西陲，境内重峦叠嶂，地形极其闭塞。正是这种隔绝的地理环境，使其保留了极具原始风貌的内向型村落肌理。受制于崎岖的地势，祁门的古建大多依山就势、紧凑排布。散落于各村落的宗祠与古戏台，不仅是精巧的木构建筑，更是古代徽州乡间维系宗族血脉、开展公共礼乐活动的核心空间节点，见证了深山聚落中极其丰满的精神文化生活。",
        chart: [55, 25, 20]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const svgWrapper = document.getElementById("svg-wrapper");
    const introSection = document.getElementById("intro-section");
    const infoCard = document.getElementById("info-card");
    const closeBtn = document.getElementById("close-btn");

    const svgWrapInitial = document.getElementById("svg-wrapper");
    if(svgWrapInitial) svgWrapInitial.classList.add("initial-enter");

    // ========== 处理透明线稿图片（白色背景转透明） ==========
    function processTransparentLineArt(imgSrc, callback) { 
        const img = new Image(); 
        img.crossOrigin = "Anonymous"; 
        img.onload = () => { 
            try { 
                const canvas = document.createElement("canvas"); 
                canvas.width = img.width; 
                canvas.height = img.height; 
                const ctx = canvas.getContext("2d"); 
                ctx.drawImage(img, 0, 0); 
                const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height); 
                const data = imgData.data; 
                for (let i = 0; i < data.length; i += 4) { 
                    const r = data[i], g = data[i+1], b = data[i+2]; 
                    if (r > 200 && g > 200 && b > 200) { 
                        data[i+3] = 0; 
                    } 
                } 
                ctx.putImageData(imgData, 0, 0); 
                callback(canvas.toDataURL("image/png")); 
            } catch(e) { 
                callback(imgSrc); 
            } 
        }; 
        img.onerror = () => callback(imgSrc); 
        img.src = imgSrc; 
    }

    // ========== 预加载开屏装饰图片 ==========
    function preloadSplashImages() {
        return new Promise((resolve) => {
            const images = [
                document.querySelector('.splash-decorate.up'),
                document.querySelector('.splash-decorate.down')
            ];
            
            let loadedCount = 0;
            const totalCount = 2;
            
            // 立即隐藏装饰图片
            images.forEach(img => {
                if(img) {
                    img.style.opacity = '0';
                    img.style.animation = 'none';
                }
            });
            
            images.forEach((img, index) => {
                if (img) {
                    // 创建新的Image对象来预加载
                    const preloadImg = new Image();
                    preloadImg.onload = () => {
                        loadedCount++;
                        if (loadedCount === totalCount) {
                            // 两个图片都加载完了，恢复动画
                            // 使用 requestAnimationFrame 避免强制重排
                            requestAnimationFrame(() => {
                                images.forEach((el) => {
                                    if(el) {
                                        el.style.opacity = '';
                                        el.style.animation = '';
                                    }
                                });
                            });
                            resolve();
                        }
                    };
                    preloadImg.onerror = () => {
                        loadedCount++;
                        if (loadedCount === totalCount) {
                            // 如果加载失败，也执行恢复逻辑
                            requestAnimationFrame(() => {
                                images.forEach((el) => {
                                    if(el) {
                                        el.style.opacity = '';
                                        el.style.animation = '';
                                    }
                                });
                            });
                            resolve();
                        }
                    };
                    preloadImg.src = img.src;
                }
            });
            
            // 10秒超时保护
            setTimeout(() => {
                if (loadedCount < totalCount) {
                    // 超时时强制恢复
                    requestAnimationFrame(() => {
                        images.forEach((el) => {
                            if(el) {
                                el.style.opacity = '';
                                el.style.animation = '';
                            }
                        });
                    });
                    resolve();
                }
            }, 10000);
        });
    }

    // ========== 预加载六个县的介绍图片 ==========
    function preloadCountyImages() {
        const countyIds = ['shexian', 'xiuning', 'yixian', 'jixi', 'wuyuan', 'qimen'];
        countyIds.forEach(id => {
            const img = new Image();
            img.src = `./county/${id}.png`;
        });
    }

    // 首先预加载开屏图片，然后继续其他加载
    preloadSplashImages().then(() => {
        // 开屏图片加载完成后，开始预加载县图片
        preloadCountyImages();
        
        // 启用"进入"按钮的点击功能
        const enterBtn = document.getElementById("enter-btn");
        if (enterBtn) {
            enterBtn.disabled = false;
            enterBtn.classList.add("ready");
        }

        // 继续加载主要数据
        return Promise.all([
            fetch("./data/data.jsonl").then(res => res.text()).catch(e => { console.error("Could not load data.jsonl:", e); return ""; }),
            fetch('./map.svg').then(res => res.text())
        ]);
    }).then(([text, svgContent]) => {
        if(text) {
            const splashScreen = document.getElementById("splash-screen");
            const enterBtn = document.getElementById("enter-btn");
            const svgWrapperNode = document.getElementById("svg-wrapper");
            
            if (enterBtn) {
                enterBtn.textContent = "点击进入";
                enterBtn.disabled = false;
                enterBtn.classList.add("pulse-animation");
                
                enterBtn.addEventListener("click", () => {
                    if(splashScreen) splashScreen.classList.add("is-hidden");
                    setTimeout(() => {
                        if(svgWrapperNode) {
                            svgWrapperNode.classList.remove("initial-enter");
                        }
                    }, 400);
                    
                    // 用户进入后开始预加载建筑图片（不会影响开屏动画）
                    processArchitecturesInBatches();
                });
            }

            const lines = text.trim().split("\n"); 
            lines.forEach(line => { 
                if(!line) return; 
                try { 
                    const obj = JSON.parse(line); 
                    if (!bgArchData[obj.county]) bgArchData[obj.county] = []; 
                    const existingIndex = bgArchData[obj.county].findIndex(i => i.id === obj.id);
                    if(existingIndex === -1) {
                        const _catMatch = archCategories.find(c => c.name === obj.category || c.type === obj.category);
                        const _catType = _catMatch ? _catMatch.type : obj.category;
                        bgArchData[obj.county].push({
                            id: obj.id,
                            county: obj.county,
                            type: _catType,
                            typeName: obj.category,
                            name: coreRegionsConfig[obj.county].name + "·" + obj.name,
                            x: obj.coordinates[0],
                            y: obj.coordinates[1], 
                            image: obj.image, 
                            markdown: obj.markdown 
                        }); 
                    } 
                } catch(e) {} 
            });
        }
        
        // ========== 预加载前6个建筑的图片（在点击"进入"按钮后开始） ==========
        // 该函数会在用户点击"进入"按钮时被调用，不会阻塞开屏动画
        function preloadArchitectureImages() {
            // 该函数仅用作声明，实际处理逻辑在 processArchitecturesInBatches()
            // 真正的预加载会在用户点击"进入"按钮后触发
        }
        
        // 分批处理建筑图片的缓存（在用户交互时调用）
        function processArchitecturesInBatches() {
            const countyIds = ['shexian', 'xiuning', 'yixian', 'jixi', 'wuyuan', 'qimen'];
            const allArchs = [];
            
            // 收集所有6万以内的建筑
            for (const countyId of countyIds) {
                const architectures = bgArchData[countyId] || [];
                for (let i = 0; i < Math.min(6, architectures.length); i++) {
                    allArchs.push(architectures[i]);
                }
            }
            
            let currentIndex = 0;
            
            // 每次处理2个，然后让出时间片
            const processBatch = () => {
                const batchSize = 2;
                let processed = 0;
                
                while (currentIndex < allArchs.length && processed < batchSize) {
                    const arch = allArchs[currentIndex];
                    currentIndex++;
                    
                    if (arch.image && !architectureImageCache[arch.id]) {
                        // 异步处理，不阻塞
                        processTransparentLineArt(arch.image, (dataUrl) => {
                            architectureImageCache[arch.id] = dataUrl;
                        });
                    }
                    processed++;
                }
                
                // 如果还有剩余，继续处理
                if (currentIndex < allArchs.length) {
                    setTimeout(processBatch, 150); // 150ms后处理下一批
                }
            };
            
            processBatch();
        }
        
        const mapContainer = document.createElement("div");
        mapContainer.id = "map-3d-wrap";
        mapContainer.innerHTML = svgContent;

        const archHtmlLayer = document.createElement("div");
        archHtmlLayer.id = "html-arch-layer";
        mapContainer.appendChild(archHtmlLayer);
        
        svgWrapper.innerHTML = '';
        svgWrapper.appendChild(mapContainer);

        const svgElement = mapContainer.querySelector('svg');

        if(svgElement) {
            const paths = svgElement.querySelectorAll("path");
            paths.forEach(p => p.removeAttribute("class"));

            svgElement.style.overflow = "visible";

            const bgImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
            bgImage.setAttribute("href", "./background/background.png");
            const bgW = bgDecorationConfig.baseWidth * bgDecorationConfig.scale;
            const bgH = bgDecorationConfig.baseHeight * bgDecorationConfig.scale;
            bgImage.setAttribute("x", bgDecorationConfig.centerX - bgW / 2);
            bgImage.setAttribute("y", bgDecorationConfig.centerY - bgH / 2);
            bgImage.setAttribute("width", bgW);
            bgImage.setAttribute("height", bgH);
            bgImage.style.pointerEvents = "none";
            bgImage.style.mixBlendMode = "multiply";

            const mapGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
            let defs = svgElement.querySelector("defs");
            if (!defs) {
                defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
                svgElement.prepend(defs);
            }
            const clipPath = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
            clipPath.setAttribute("id", "map-border-clip");
            const clipRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            const vb = svgElement.viewBox && svgElement.viewBox.baseVal;
            const width = vb && vb.width ? vb.width : 757.5;
            const height = vb && vb.height ? vb.height : 821;
            clipRect.setAttribute("x", "1.5");
            clipRect.setAttribute("y", "1.5");
            clipRect.setAttribute("width", width - 3);
            clipRect.setAttribute("height", height - 3);
            clipPath.appendChild(clipRect);
            defs.appendChild(clipPath);

            mapGroup.setAttribute("clip-path", "url(#map-border-clip)");

            Array.from(svgElement.childNodes).forEach(child => {
                if (child.tagName && child.tagName.toLowerCase() !== 'defs' && child !== mapGroup) {
                    mapGroup.appendChild(child);
                }
            });
            svgElement.insertBefore(mapGroup, svgElement.firstChild);

            svgElement.appendChild(bgImage);

            const coreShadowGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
            coreShadowGroup.setAttribute("id", "core-shadow-group");
            Object.keys(coreRegionsConfig).forEach(id => {
                const el = document.getElementById(id);
                if (el) coreShadowGroup.appendChild(el);
            });
            
            svgElement.appendChild(coreShadowGroup);

            applyTexturesToCoreRegions(svgElement, coreShadowGroup);

            generateLabels(svgElement);
            generateArchPoints(svgElement);
            setupSubMenu();
            setupTooltips();
            setupInteractions();
        }
    });

    function applyTexturesToCoreRegions(svgElement, coreShadowGroup) {
        let seed = 42;
        function seededRandom() {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        }

        let defs = svgElement.querySelector("defs");
        if (!defs) {
            defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            svgElement.prepend(defs);
        }

        Object.keys(coreRegionsConfig).forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            const randomX = -Math.floor(seededRandom() * 150);
            const randomY = -Math.floor(seededRandom() * 150);

            const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
            pattern.setAttribute("id", `texture-${id}`);
            pattern.setAttribute("patternUnits", "userSpaceOnUse");
            pattern.setAttribute("width", "1000");
            pattern.setAttribute("height", "1000");

            const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
            image.setAttribute("href", "./background/background_texture.png");
            image.setAttribute("x", randomX);
            image.setAttribute("y", randomY);
            image.setAttribute("width", "1000");
            image.setAttribute("height", "1000");
            image.setAttribute("preserveAspectRatio", "xMidYMid slice");

            pattern.appendChild(image);
            defs.appendChild(pattern);

            const overlay = el.cloneNode(true);
            overlay.removeAttribute("id");
            overlay.setAttribute("pointer-events", "none");
            overlay.style.mixBlendMode = "multiply";
            overlay.style.opacity = "0.35";
            overlay.style.transition = "opacity 0.4s ease"; 

            overlay.setAttribute("fill", `url(#texture-${id})`);
            overlay.setAttribute("stroke", "none");
            const subPaths = overlay.querySelectorAll("path");
            subPaths.forEach(p => {
                p.setAttribute("fill", `url(#texture-${id})`);
                p.setAttribute("stroke", "none");
                p.removeAttribute("class");
                p.style = "";
            });

            coreShadowGroup.insertBefore(overlay, el.nextSibling);
            el._textureOverlay = overlay;
        });
    }

    window.focusCountyOnMap = function(id) {
        const el = document.getElementById(id);
        if (!el) return;
        const bbox = el.getBBox();
        const targetX = bbox.x + bbox.width / 2;
        const targetY = bbox.y + bbox.height / 2;
        const cx = 378.75;
        const cy = 410.5;
        const vhPerUnit = 180 / 821;
        const moveX = (cx - targetX) * vhPerUnit;
        const moveY = (cy - targetY) * vhPerUnit;
        const svgWrapper = document.getElementById("svg-wrapper");
        if (svgWrapper) {
            const transformString = `perspective(1200px) rotateX(48deg) rotateZ(-3deg) scale(1.15) translateX(${moveX + 24}vh) translateY(${moveY - 15}vh)`;
            svgWrapper.style.transform = transformString;
            svgWrapper.classList.add("is-focused");
            
            const maskGroup = svgWrapper.querySelector('#viewport-edge-mask');
            if (maskGroup) {
                maskGroup.style.transform = `translateX(${-moveX - 24}vh) translateY(${-moveY + 15}vh) scale(0.8695652) rotateZ(3deg) rotateX(-48deg)`;
                maskGroup.style.transformOrigin = "center";
            }
        }
        Object.keys(coreRegionsConfig).forEach(otherId => {
            const otherEl = document.getElementById(otherId);
            if (otherEl) {
                otherEl.style.opacity = (otherId === id) ? '1' : '0.3';
                if (otherEl._textureOverlay) {
                    otherEl._textureOverlay.style.opacity = (otherId === id) ? '0.75' : '0.2';
                }
            }
        });
        const introSection = document.getElementById("intro-section");
        if (introSection) introSection.classList.add("hidden");
    };

    function setupInteractions() {
        const originalIntroText = introSection.innerHTML;
        let introHoverTimeout;

        closeBtn.addEventListener("click", () => {
            infoCard.classList.add("hidden");
            introSection.classList.remove("hidden");
            svgWrapper.classList.remove("is-focused");

            if (window.closeSubMenu) {
                window.closeSubMenu();
            }
            
            Object.keys(coreRegionsConfig).forEach(id => {
                const el = document.getElementById(id);
                if(el) { 
                    el.style.opacity = '1'; 
                    if (el._textureOverlay) el._textureOverlay.style.opacity = '0.4';
                }
            });
            svgWrapper.style.transform = "perspective(1200px) rotateX(0deg) rotateZ(0deg) scale(0.5) translate(0, 0)";
            
            const maskGroup = svgWrapper.querySelector('#viewport-edge-mask');
            if (maskGroup) {
                maskGroup.style.transform = "none";
            }
        });

        Object.keys(coreRegionsConfig).forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            el.addEventListener("mouseover", () => {
                if (!infoCard.classList.contains("hidden")) return;
                clearTimeout(introHoverTimeout);
                const countyData = huizhouData[id];
                if (countyData && introSection) {
                    introSection.classList.remove("fade-out");
                    introSection.innerHTML = "<p>" + countyData.desc + "</p>";
                }
            });

            el.addEventListener("mouseleave", () => {
                if (infoCard.classList.contains("hidden")) {
                    clearTimeout(introHoverTimeout);
                    introSection.classList.add("fade-out");
                    introHoverTimeout = setTimeout(() => {
                        introSection.innerHTML = originalIntroText;
                        introSection.classList.remove("fade-out");
                    }, 250);
                }
            });

            el.addEventListener("click", (e) => {
                const isCardVisible = !infoCard.classList.contains("hidden");

                introSection.classList.add("hidden");
                svgWrapper.classList.add("is-focused");

                if (window.openSubMenuForCounty) {
                    window.openSubMenuForCounty(id);
                }

                if (isCardVisible) {
                    infoCard.classList.add("hidden");
                    setTimeout(() => {
                        updateCardInfoAsync(id).then(() => infoCard.classList.remove("hidden"));
                    }, 350); 
                } else {
                    updateCardInfoAsync(id).then(() => infoCard.classList.remove("hidden"));
                }

                window.focusCountyOnMap(id);
            });
        });
    }

    window.showArchCardInfo = function(id, countyId) { 
        const metaList = bgArchData[countyId];
        const meta = metaList.find(i => i.id === id);
        if(!meta) return;

        // 保存当前正在查看的建筑所在的县，以便hover时恢复
        window.currentViewingCounty = countyId;

        if (window.focusCountyOnMap) window.focusCountyOnMap(countyId);

        const introSection = document.getElementById("intro-section");
        const infoCard = document.getElementById("info-card");
        const isCardVisible = !infoCard.classList.contains("hidden");

        introSection.classList.add("hidden");

        let imgPromise = Promise.resolve('');
        if (meta.image) {
            // 先检查缓存中是否有预加载好的图片
            if (architectureImageCache[id]) {
                imgPromise = Promise.resolve(architectureImageCache[id]);
            } else {
                // 否则实时处理（用于超出前6个的建筑）
                imgPromise = new Promise(resolve => {
                    processTransparentLineArt(meta.image, resolve);
                });
            }
        }

        const performUpdateAndShow = (dataUrl) => {
            document.getElementById("card-county-seal").src = "./seal/" + countyId + ".png";
            document.getElementById("card-title").textContent = meta.name;
            document.getElementById("card-subtitle").textContent = "[" + coreRegionsConfig[countyId].name + "] " + meta.typeName;
            const descEl = document.getElementById("card-desc");
            if(descEl) descEl.innerHTML = "正在加载描述...";
            if(meta.markdown) {
                fetch(meta.markdown).then(r => r.text()).then(md => {
                    const html = window.marked ? window.marked.parse(md) : md;      
                    if(descEl) descEl.innerHTML = html;
                }).catch(e => {
                    if(descEl) descEl.innerHTML = "加载失败";
                });
            }

            const placeholder = document.querySelector(".card-image-placeholder");  
            if(placeholder) {
                placeholder.style.height = '';
                placeholder.style.background = '';
                placeholder.style.overflow = '';
                if(dataUrl) {
                    placeholder.innerHTML = '<img id="card-main-image" src="' + dataUrl + '" style="width:100%; max-height:300px; object-fit:contain;"/>';
                } else {
                    placeholder.innerHTML = '<div class="placeholder-ink-graphic"><svg viewBox="0 0 100 100" class="ink-icon"><path d="M10 80 L50 20 L90 80 Z" fill="none" stroke="#666" stroke-width="2"/></svg><span>暂无建筑线稿</span></div>';
                }
            }
            infoCard.classList.remove("hidden");
        };

        if (isCardVisible) {
            infoCard.classList.add("hidden");
            Promise.all([imgPromise, new Promise(r => setTimeout(r, 350))]).then(([dataUrl]) => performUpdateAndShow(dataUrl));
        } else {
            imgPromise.then(dataUrl => performUpdateAndShow(dataUrl));
        }
    }


    function updateCardInfoAsync(id) {
        return new Promise(resolve => {
            const data = huizhouData[id];
            if(!data) return resolve();

            document.getElementById("card-county-seal").src = './seal/' + id + '.png';
            document.getElementById("card-title").textContent = data.title;
            document.getElementById("card-subtitle").textContent = data.subtitle;   
            document.getElementById("card-desc").textContent = data.desc;

            const placeholder = document.querySelector(".card-image-placeholder");  
            if(placeholder) {
                placeholder.style.height = 'auto';
                placeholder.style.background = 'transparent';
                placeholder.style.overflow = 'visible';
                // 初始状态为空，等待图片加载完成后再显示
                placeholder.innerHTML = '';
                
                processTransparentLineArt('./county/' + id + '.png', (dataUrl) => {    
                    placeholder.innerHTML = '<img id="card-main-image" src="' + dataUrl + '" style="width:100%; height:auto; display:block; -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%); mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);"/>';
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    function generateLabels(svgElement) {
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
            svgElement.insertAdjacentHTML('beforeend', textHTML); 
        });

        Object.keys(coreRegionsConfig).forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const bbox = el.getBBox();
            
            let x = bbox.x + bbox.width / 2;
            let y = bbox.y + bbox.height / 2;
            if (id === 'qimen') {
                x += 20;
                y += 10;
            }

            const textHTML = `<text x="${x}" y="${y}" class="core-text svg-label" text-anchor="middle" dominant-baseline="central">${coreRegionsConfig[id].name}</text>`;
            svgElement.insertAdjacentHTML('beforeend', textHTML);   
        });
    }

    function generateArchPoints(svgElement) {
        const archHtmlLayer = document.getElementById("html-arch-layer");
        const vb = svgElement.viewBox && svgElement.viewBox.baseVal;
        const viewBoxW = vb && vb.width ? vb.width : 757.5;
        const viewBoxH = vb && vb.height ? vb.height : 821;
        
        // 按坐标分组
        const pointsByCoord = {};
        
        Object.keys(coreRegionsConfig).forEach(countyId => {
            if (!bgArchData[countyId]) return;
            bgArchData[countyId].forEach(ptMeta => {
                const point = {
                    ...ptMeta,
                    countyId: countyId
                };
                const key = `${ptMeta.x},${ptMeta.y}`;
                if (!pointsByCoord[key]) {
                    pointsByCoord[key] = [];
                }
                pointsByCoord[key].push(point);
            });
        });
        
        // 为每个坐标创建容器
        Object.entries(pointsByCoord).forEach(([coord, items]) => {
            const [x, y] = coord.split(',').map(Number);
            const baseSize = 40;
            const isMultiple = items.length > 1;
            
            const firstItem = items[0];
            let iconUrl = "./icon/dwelling.svg";
            const catInfo = archCategories.find(c => c.type === firstItem.type || c.name === firstItem.type);
            if (catInfo && catInfo.icon) iconUrl = catInfo.icon;
            
            const div = document.createElement("div");
            div.style.backgroundImage = `url(${iconUrl})`;
            div.style.backgroundSize = "contain";
            div.style.backgroundRepeat = "no-repeat";
            div.style.backgroundPosition = "bottom center";
            
            const classType = catInfo ? catInfo.type : firstItem.type;
            div.className = `arch-pt ${firstItem.countyId} ${classType}`;
            div.setAttribute("data-coord", coord);
            div.setAttribute("data-count", items.length);
            div._pointsData = items;
            
            // 多点：添加角标
            if (isMultiple) {
                div.classList.add("multi-point");
                const badge = document.createElement("span");
                badge.className = "point-badge";
                badge.textContent = items.length;
                div.appendChild(badge);
            }
            
            // 定位
            const leftPercent = (x / viewBoxW) * 100;
            const topPercent = (y / viewBoxH) * 100;
            div.style.position = "absolute";
            div.style.left = leftPercent + "%";
            div.style.top = topPercent + "%";
            div.style.width = baseSize + "px";
            div.style.height = baseSize + "px";
            div.style.transformOrigin = "bottom center";
            div.style.marginLeft = "-" + (baseSize / 2) + "px";
            div.style.marginTop = "-" + baseSize + "px";
            div.style.display = "block";
            div.style.cursor = "pointer";
            
            // 单个点：点击事件
            if (!isMultiple) {
                div.addEventListener("click", function(e) {
                    e.stopPropagation();
                    const points = this._pointsData;
                    window.showArchCardInfo(points[0].id, points[0].countyId);
                });
            } else {
                // 多个点：hover 悬浮菜单（离开自动消失）
                let hoverTimeout;
                let menuElement = null;
                
                const showMenu = () => {
                    if (hoverTimeout) clearTimeout(hoverTimeout);
                    if (menuElement) {
                        menuElement.remove();
                        menuElement = null;
                    }
                    
                    menuElement = createHoverMenu(items);
                    document.body.appendChild(menuElement);
                    
                    const rect = div.getBoundingClientRect();
                    menuElement.style.left = rect.left + rect.width / 2 + "px";
                    menuElement.style.top = rect.top - 10 + "px";
                    menuElement.style.transform = "translateX(-50%) translateY(-100%)";
                    menuElement.style.opacity = "1";
                    menuElement.style.visibility = "visible";
                    
                    menuElement.addEventListener("mouseenter", () => {
                        if (hoverTimeout) clearTimeout(hoverTimeout);
                    });
                    
                    menuElement.addEventListener("mouseleave", () => {
                        hideMenu();
                    });
                };
                
                const hideMenu = () => {
                    if (hoverTimeout) clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(() => {
                        if (menuElement) {
                            menuElement.remove();
                            menuElement = null;
                        }
                    }, 200);
                };
                
                div.addEventListener("mouseenter", showMenu);
                div.addEventListener("mouseleave", hideMenu);
            }
            
            archHtmlLayer.appendChild(div);
        });
    }

    // 创建 hover 悬浮菜单（离开自动消失）
    function createHoverMenu(items) {
        const menu = document.createElement("div");
        menu.className = "arch-hover-menu";
        
        items.forEach(item => {
            const menuItem = document.createElement("div");
            menuItem.className = "hover-menu-item";
            
            let iconUrl = "./icon/dwelling.svg";
            const catInfo = archCategories.find(c => c.type === item.type || c.name === item.type);
            if (catInfo && catInfo.icon) iconUrl = catInfo.icon;
            
            menuItem.innerHTML = `
                <img src="${iconUrl}" class="hover-menu-icon" />
                <div class="hover-menu-info">
                    <div class="hover-menu-name">${item.name}</div>
                    <div class="hover-menu-type">${item.typeName}</div>
                </div>
            `;
            
            menuItem.addEventListener("click", (e) => {
                e.stopPropagation();
                window.showArchCardInfo(item.id, item.countyId);
                menu.remove();
            });
            
            menu.appendChild(menuItem);
        });
        
        return menu;
    }

    function setupSubMenu() {
        const tabs = document.querySelectorAll(".nav-tabs button");
        const subNavPanel = document.getElementById("sub-nav-panel");
        const subNavClose = document.getElementById("sub-nav-close");
        const subNavList = document.getElementById("sub-nav-list");
        const subNavTitle = document.getElementById("sub-nav-title");

        window.currentFocusCounty = null;
        
        window.openSubMenuForCounty = function(countyId) {
            window.currentFocusCounty = countyId;
            const activeTab = document.querySelector(".nav-tabs button.active");
            if(activeTab) {
                activeTab.click(); 
            } else {
                tabs[0].click();
            }
        };
        
        window.closeSubMenu = function() {
            if(subNavPanel) subNavPanel.classList.remove("active");
            window.currentFocusCounty = null;
            const activeTab = document.querySelector(".nav-tabs button.active");
            let _type = "all";
            if (activeTab) _type = activeTab.getAttribute("data-type");

            // 闭包sub-nav-panel时，应用当前tab的过滤
            document.querySelectorAll(".arch-pt").forEach(pt => {
                if (_type === "all" || pt.classList.contains(_type)) {
                    pt.style.display = "block";
                } else {
                    pt.style.display = "none";
                }
            });
        }

        if(subNavClose) {
            subNavClose.addEventListener("click", () => {
                window.closeSubMenu();
            });
        }

        let isSubNavListBuilt = false;
        tabs.forEach(tab => {
            tab.addEventListener("click", function(e) {
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                const type = tab.getAttribute("data-type");

                if (window.currentFocusCounty) {
                    subNavPanel.classList.add("active");
                    if (!isSubNavListBuilt) {
                        isSubNavListBuilt = true;
                        let list = Object.values(bgArchData).flat();
                        subNavTitle.textContent = "营造图鉴";
                        subNavList.innerHTML = "";
                        list.forEach(item => {
                            const li = document.createElement("li");
                            let imgHtml = item.image ? "<img class='art-preview' src='" + item.image + "' alt=''/> " : "";
                            li.innerHTML = imgHtml + "<div class='art-title'>" + item.name + "</div>";
                            li.setAttribute("data-type", item.type);
                            if (item.image) { processTransparentLineArt(item.image, (dataUrl) => { const imgEl = li.querySelector(".art-preview"); if(imgEl) imgEl.src = dataUrl; }); }
                            li.addEventListener("mouseenter", () => highlightPoint(item.id));
                            li.addEventListener("mouseleave", () => unhighlightPoint(item.id));
                            li.addEventListener("mouseover", () => {
                                // 在sub-nav-panel hover到建筑时，同时放大建筑点并聚焦到该建筑所在县
                                highlightPoint(item.id);
                                if (window.focusCountyOnMap) window.focusCountyOnMap(item.county);
                            });
                            li.addEventListener("mouseout", () => {
                                // 离开时取消放大，并恢复到当前正在查看的建筑所在县（如果有的话）
                                unhighlightPoint(item.id);
                                if (window.currentViewingCounty && window.focusCountyOnMap) {
                                    window.focusCountyOnMap(window.currentViewingCounty);
                                } else if (window.currentFocusCounty && window.focusCountyOnMap) {
                                    window.focusCountyOnMap(window.currentFocusCounty);
                                }
                            });
                            li.addEventListener("click", (e) => {
                                e.stopPropagation();
                                window.showArchCardInfo(item.id, item.county);
                            });
                            subNavList.appendChild(li);
                        });
                    }
                    
                    Array.from(subNavList.children).forEach(li => {
                        if (type === "all" || li.getAttribute("data-type") === type) {
                            li.style.display = "flex";
                        } else {
                            li.style.display = "none";
                        }
                    });

                    // 显示所有地区的建筑点，仅按类型过滤
                    document.querySelectorAll(".arch-pt").forEach(pt => {
                        if (type === "all" || pt.classList.contains(type)) {    
                            pt.style.display = "block";
                        } else {
                            pt.style.display = "none";
                        }
                    });
                } else {
                    // sub-nav-panel未打开时，也要按类型过滤但显示所有地区建筑
                    document.querySelectorAll(".arch-pt").forEach(pt => {
                        if (type === "all" || pt.classList.contains(type)) {
                            pt.style.display = "block";
                        } else {
                            pt.style.display = "none";
                        }
                    });
                }
            });
        });
    }

    function setupTooltips() {
        const tooltip = document.getElementById("arch-tooltip");
        const svgWrapper = document.getElementById("svg-wrapper");
        if(!tooltip || !svgWrapper) return;
        
        svgWrapper.addEventListener("mousemove", (e) => {
            if(e.target.classList && e.target.classList.contains("arch-pt")) {
                const points = e.target._pointsData;
                if(points && points.length === 1) {
                    tooltip.textContent = points[0].name;
                    tooltip.classList.remove("hidden");
                    tooltip.classList.add("visible");
                    tooltip.style.left = `${e.clientX}px`;
                    tooltip.style.top = `${e.clientY - 15}px`;
                } else {
                    tooltip.classList.add("hidden");
                    tooltip.classList.remove("visible");
                }
            } else {
                tooltip.classList.add("hidden");
                tooltip.classList.remove("visible");
            }
        });
    }

    function highlightPoint(id) {
        const pt = document.querySelector(`.arch-pt[data-id="${id}"]`);
        if(pt) {
            pt.classList.add("is-highlighted");
        }
    }

    function unhighlightPoint(id) {
        const pt = document.querySelector(`.arch-pt[data-id="${id}"]`);
        if(pt) {
            pt.classList.remove("is-highlighted");
        }
    }
});