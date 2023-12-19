const IS_BROWSER = typeof window !== 'undefined';
export const setupMocks = async () => {

    if(IS_BROWSER){
        const {mswWorker} = await import('./worker');
        await mswWorker.start();
    }else{
        const {mswServer} = await import('./server');
        mswServer.listen();
    }
}