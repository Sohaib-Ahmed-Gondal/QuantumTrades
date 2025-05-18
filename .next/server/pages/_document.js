"use strict";(()=>{var e={};e.id=660,e.ids=[660],e.modules={981:(e,r,t)=>{t.r(r),t.d(r,{default:()=>a});var s=t(997),d=t(859);function a(){return(0,s.jsxs)(d.Html,{children:[s.jsx(d.Head,{}),(0,s.jsxs)("body",{children:[s.jsx("script",{dangerouslySetInnerHTML:{__html:`
              const stored = localStorage.getItem('darkMode');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (stored === 'true' || (!stored && prefersDark)) {
                document.documentElement.classList.add('dark');
              }
            `}}),s.jsx(d.Main,{}),s.jsx(d.NextScript,{})]})]})}},785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},689:e=>{e.exports=require("react")},997:e=>{e.exports=require("react/jsx-runtime")},315:e=>{e.exports=require("path")}};var r=require("../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[859],()=>t(981));module.exports=s})();