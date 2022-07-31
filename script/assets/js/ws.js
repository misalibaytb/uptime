let ws
        function init() {
            if(ws){
                ws = null
                ws.close()
            }
            ws = new io()
            ws.on("message", (message) => {
                console.log(message)
                if(message.loaded < 99.99){
                    if(window.location.href.endsWith("?skip=true") && message.skip === true) return;
                    window.location.reload()
                }
            })
            ws.on("close", () => {
                ws = null;
                console.log('WebSocket closed')
                init();
            })
        }
        init()