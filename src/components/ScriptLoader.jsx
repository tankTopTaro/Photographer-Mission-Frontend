import { useEffect } from 'react'

const loadScript = (src, integrity, crossOrigin, referrerPolicy) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src

        if (integrity) { script.integrity = integrity }
        
        if (crossOrigin) { script.crossOrigin = crossOrigin }

        if (referrerPolicy) { script.referrerPolicy = referrerPolicy }

        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
    })
}

const ScriptLoader = () => {
    useEffect(() => {
        const loadScripts = async () => {
            try {
                await loadScript("https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js", "sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj", "anonymous")
                await loadScript("https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js", "sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN", "anonymous")
                await loadScript("https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js", "sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+", "anonymous")
                await loadScript("https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js", "sha512-bPs7Ae6pVvhOSiIcyUClR7/q2OAsRiovw4vAkX+zJbw3ShAeeqezq50RIIcIURq7Oa20rW2n2q+fyXBNcU9lrw==", "anonymous", "no-referrer")
                await loadScript("https://cdnjs.cloudflare.com/ajax/libs/waypoints/4.0.1/jquery.waypoints.min.js", "sha512-CEiA+78TpP9KAIPzqBvxUv8hy41jyI3f2uHi7DGp/Y/Ka973qgSdybNegWFciqh6GrN2UePx2KkflnQUbUhNIA==", "anonymous", "no-referrer")
                await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jquery.imagesloaded/5.0.0/imagesloaded.pkgd.min.js", "sha512-kfs3Dt9u9YcOiIt4rNcPUzdyNNO9sVGQPiZsub7ywg6lRW5KuK1m145ImrFHe3LMWXHndoKo2YRXWy8rnOcSKg==", "anonymous", "no-referrer")
                
                // local scripts
                // await loadScript("/js/jquery-3.2.1.slim.min.js")
                // await loadScript("/js/popper.min.js")
                // await loadScript("/js/bootstrap.min.js")
                // await loadScript("/js/owl.carousel.min.js")
                // await loadScript("/js/jquery.waypoints.min.js")
                // await loadScript("/js/imagesloaded.pkgd.min.js")
                
                // await loadScript("/js/main.js")
                console.log('Scripts loaded')
            } catch (error) {
                console.error('Failed to load scripts:', error)
            }
        }

        loadScripts()
    }, [])
}

export default ScriptLoader