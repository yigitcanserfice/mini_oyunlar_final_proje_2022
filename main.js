const {app,BrowserWindow}=require("electron")

function createWindow()
{
    const win=new BrowserWindow({
        width:1500,
        height:900,
        autoHideMenuBar: true,
        resizable: false,
        icon:'steam_icon.png',
        webPreferences:{
        nodeIntegration:true,           
        
        }
    })

    win.loadFile("index.html")
}

app.whenReady().then(createWindow)