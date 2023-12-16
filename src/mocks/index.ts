const IS_BROWSER = typeof window !== 'undefined';
export const setupMocks = async () => {

    console.log("IS BROwSER? ",IS_BROWSER);
    if(IS_BROWSER){
        const {mswWorker} = await import('./worker');
        await mswWorker.start();
    }else{
        const {mswServer} = await import('./server');
        mswServer.listen();
    }
}