import React from "react";
import { AnimatePresence } from "motion/react"
import * as motion from "motion/react-client"
import { useState } from "react"
import PanList from "./categories/PanList";
import PostreList from "./categories/PostreList";
import BebidaList from "./categories/BebidasList";

const componentMap: Record<string, React.FC> = {
    Panes: PanList,
    Postres: PostreList,
    Bebidas: BebidaList,
};


const CatSelect: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    console.log("Componente actual:", selectedTab.label);
    console.log("Componente cargado:", componentMap[selectedTab.label]);

    return (
    <div style={container}>
        <nav style={nav}>
        <ul style={tabsContainer}>
            {tabs.map((item) => (
            <motion.li
                key={item.label}
                initial={false}
                animate={{
                backgroundColor: item === selectedTab ? "#eee" : "#eee0",
                }}
                style={tab}
                onClick={() => setSelectedTab(item)}
            >
                {`${item.icon} ${item.label}`}
                {item === selectedTab && (
                <motion.div style={underline} layoutId="underline" />
                )}
            </motion.li>
            ))}
        </ul>
        </nav>
            <main style={iconContainer}>
            <AnimatePresence mode="wait">
                {componentMap[selectedTab.label] && (
                <motion.div
                    key={selectedTab.label}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ width: "100%" }} // o elimina style por completo
                    >
                    {React.createElement(componentMap[selectedTab.label])}
                </motion.div>

                )}
            </AnimatePresence>
            </main>

    </div>
    );
};

export default CatSelect;

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    width: "w-full",
    height: "60vh",
    maxHeight: 360,
    borderRadius: 10,
    background: "white",
    overflow: "hidden",
    boxShadow:
        "0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075)",
    display: "flex",
    flexDirection: "column",
}

const nav: React.CSSProperties = {
    background: "#fdfdfd",
    padding: "5px 5px 0",
    borderRadius: "10px",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottom: "1px solid #eeeeee",
    height: 44,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const tabsStyles: React.CSSProperties = {
    listStyle: "none",
    padding: 0,
    margin: 0,
    fontWeight: 500,
    fontSize: 25,
}

const tabsContainer: React.CSSProperties = {
    ...tabsStyles,
    display: "flex",
    width: "100%",
}

const tab: React.CSSProperties = {
    ...tabsStyles,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    padding: "10px 15px",
    position: "relative",
    background: "white",
    cursor: "pointer",
    height: 44,
    display: "flex",
    flex: 1,
    flexDirection: "column",    
    justifyContent: "center",    
    alignItems: "center",       
    textAlign: "center",                         
    userSelect: "none",
    color: "#0f1115",
}


const underline: React.CSSProperties = {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
    background: "var(--accent)",
}

const iconContainer: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
}

const icon: React.CSSProperties = {
    fontSize: 128,
}

/**
 * ==============   Data   ================
 */

const allIngredients = [
  { icon: "🥐", label: "Panes" },     // ✔️ "Panes"
  { icon: "🍰", label: "Postres" },  // ✔️ "Postres"
  { icon: "🥂", label: "Bebidas" },  // ✔️ "Bebidas"
];

const tabs = allIngredients;

