

const useFileDownload = (input) => {

    const download = (content) => {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + content);
        element.setAttribute('download', 'fichier.txt');
        element.click();
    }

    return {
        download
    }
}

export default useFileDownload;