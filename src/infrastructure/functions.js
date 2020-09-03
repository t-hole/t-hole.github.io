export function get_json(res) {
    if(!res.ok) throw Error(`错误 ${res.status} ${res.statusText}`);
    return (
        res
            .text()
            .then((t)=>{
                try {
                    return JSON.parse(t);
                } catch(e) {
                    console.error('json parse error');
                    console.trace(e);
                    console.log(t);
                    throw new SyntaxError('JSON Parse Error '+t.substr(0,50));
                }
            })
    );
}

export function listen_darkmode(override) { // override: true/false/undefined
    function update_color_scheme() {
        if(override===undefined ? window.matchMedia('(prefers-color-scheme: dark)').matches : override)
            document.body.classList.add('root-dark-mode');
        else
            document.body.classList.remove('root-dark-mode');
    }

    update_color_scheme();
    window.matchMedia('(prefers-color-scheme: dark)').addListener(()=>{
        update_color_scheme();
    });
}
