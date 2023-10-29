// tt/wx/qq等顶层对象处理

export const native = ck1() || ck2() || ck3() || ck4() || ck5() || ck6() || error()

function ck1() {try{return tt}catch(e){return undefined}}
function ck2() {try{return wx}catch(e){return undefined}}
function ck3() {try{return qq}catch(e){return undefined}}
function ck4() {try{return jd}catch(e){return undefined}}
function ck5() {try{return my}catch(e){return undefined}}
function ck6() {try{return swan}catch(e){return undefined}}
function error() { throw new Error('未支持的小程序类型') }
