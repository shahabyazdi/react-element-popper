function t({from:t=0,duration:e=400}={}){return t>100&&(t=100),t<0&&(t=0),function({popper:i,data:p}){let n=i.children?.[0]?.children?.[0],[o]=p.position.split("-"),r=["left","right"].includes(o)?"width":"height";n&&(n.style[r]=p.popper[r]*t/100+"px",setTimeout((()=>{n.style.transition=e+"ms",n.style[r]=p.popper[r]+"px"}),18))}}export default t;