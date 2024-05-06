let flag = false

export const analytics = (GA_ID: string) => {
  if (flag) return
  flag = true

  if (import.meta.env.MODE !== 'development') {
    const analytics = document.createElement('script')
    analytics.async = true
    analytics.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`

    const analyticsScript = document.createElement('script')
    analyticsScript.appendChild(
      document.createTextNode(`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
  
      gtag('config', '${GA_ID}');
      console.log('Analytics Ready')
    `)
    )

    document.head.appendChild(document.createComment('Google Analytics (gtag.js)'))
    document.head.appendChild(analytics)
    document.head.appendChild(analyticsScript)
  }
}
