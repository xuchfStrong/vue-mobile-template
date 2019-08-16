import defaultSettings from '@/settings'

const title = defaultSettings.title || '古代战争辅助'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
