const MimeTypes = {
  "application-x-7zip": "mime-application-x-7zip",
  "application-rss+xml": "mime-application-rss+xml",
  "x-office-drawing": "mime-x-office-drawing",
  "text-javascript": "mime-text-x-javascript",
  "text-x-javascript": "mime-text-x-javascript",
  "message": "mime-message",
  "application-msword": "mime-application-msword",
  "multipart-encrypted": "mime-multipart-encrypted",
  "audio-x-vorbis+ogg": "mime-audio-x-vorbis+ogg",
  "application-pdf": "mime-application-pdf",
  "encrypted": "mime-encrypted",
  "application-pgp-keys": "mime-application-pgp-keys",
  "text-richtext": "mime-text-richtext",
  "text-plain": "mime-text-plain",
  "text-sql": "mime-text-x-sql",
  "text-x-sql": "mime-text-x-sql",
  "application-vnd.ms-excel": "mime-application-vnd.ms-excel",
  "application-vnd.ms-powerpoint": "mime-application-vnd.ms-powerpoint",
  "application-vnd.oasis.opendocument.formula": "mime-application-vnd.oasis.opendocument.formula",
  "x-office-spreadsheet": "mime-x-office-spreadsheet",
  "text-html": "mime-text-html",
  "x-office-document": "mime-x-office-document",
  "video-generic": "mime-video-x-generic",
  "video-x-generic": "mime-video-x-generic",
  "application-vnd.scribus": "mime-application-vnd.scribus",
  "application-ace": "mime-application-x-ace",
  "application-x-ace": "mime-application-x-ace",
  "application-tar": "mime-application-x-tar",
  "application-x-tar": "mime-application-x-tar",
  "application-bittorrent": "mime-application-x-bittorrent",
  "application-x-bittorrent": "mime-application-x-bittorrent",
  "application-x-cd-image": "mime-application-x-cd-image",
  "text-java": "mime-text-x-java",
  "text-x-java": "mime-text-x-java",
  "application-gzip": "mime-application-x-gzip",
  "application-x-gzip": "mime-application-x-gzip",
  "application-sln": "mime-application-x-sln",
  "application-x-sln": "mime-application-x-sln",
  "application-cue": "mime-application-x-cue",
  "application-x-cue": "mime-application-x-cue",
  "deb": "mime-deb",
  "application-glade": "mime-application-x-glade",
  "application-x-glade": "mime-application-x-glade",
  "application-theme": "mime-application-x-theme",
  "application-x-theme": "mime-application-x-theme",
  "application-executable": "mime-application-x-executable",
  "application-x-executable": "mime-application-x-executable",
  "application-x-flash-video": "mime-application-x-flash-video",
  "application-jar": "mime-application-x-jar",
  "application-x-jar": "mime-application-x-jar",
  "application-x-ms-dos-executable": "mime-application-x-ms-dos-executable",
  "application-msdownload": "mime-application-x-msdownload",
  "application-x-msdownload": "mime-application-x-msdownload",
  "package-generic": "mime-package-x-generic",
  "package-x-generic": "mime-package-x-generic",
  "application-php": "mime-application-x-php",
  "application-x-php": "mime-application-x-php",
  "text-python": "mime-text-x-python",
  "text-x-python": "mime-text-x-python",
  "application-rar": "mime-application-x-rar",
  "application-x-rar": "mime-application-x-rar",
  "rpm": "mime-rpm",
  "application-ruby": "mime-application-x-ruby",
  "application-x-ruby": "mime-application-x-ruby",
  "text-script": "mime-text-x-script",
  "text-x-script": "mime-text-x-script",
  "text-bak": "mime-text-x-bak",
  "text-x-bak": "mime-text-x-bak",
  "application-zip": "mime-application-x-zip",
  "application-x-zip": "mime-application-x-zip",
  "text-xml": "mime-text-xml",
  "audio-mpeg": "mime-audio-x-mpeg",
  "audio-x-mpeg": "mime-audio-x-mpeg",
  "audio-wav": "mime-audio-x-wav",
  "audio-x-wav": "mime-audio-x-wav",
  "audio-generic": "mime-audio-x-generic",
  "audio-x-generic": "mime-audio-x-generic",
  "audio-x-mp3-playlist": "mime-audio-x-mp3-playlist",
  "audio-x-ms-wma": "mime-audio-x-ms-wma",
  "authors": "mime-authors",
  "empty": "mime-empty",
  "extension": "mime-extension",
  "font-generic": "mime-font-x-generic",
  "font-x-generic": "mime-font-x-generic",
  "image-bmp": "mime-image-bmp",
  "image-gif": "mime-image-gif",
  "image-jpeg": "mime-image-jpeg",
  "image-png": "mime-image-png",
  "image-tiff": "mime-image-tiff",
  "image-ico": "mime-image-x-ico",
  "image-x-ico": "mime-image-x-ico",
  "image-eps": "mime-image-x-eps",
  "image-x-eps": "mime-image-x-eps",
  "image-generic": "mime-image-x-generic",
  "image-x-generic": "mime-image-x-generic",
  "image-psd": "mime-image-x-psd",
  "image-x-psd": "mime-image-x-psd",
  "image-xcf": "mime-image-x-xcf",
  "image-x-xcf": "mime-image-x-xcf",
  "x-office-presentation": "mime-x-office-presentation",
  "unknown": "mime-unknown",
  "opera-extension": "mime-opera-extension",
  "opera-unite-application": "mime-opera-unite-application",
  "opera-widget": "mime-opera-widget",
  "phatch-actionlist": "mime-phatch-actionlist",
  "text-makefile": "mime-text-x-makefile",
  "text-x-makefile": "mime-text-x-makefile",
  "x-office-address-book": "mime-x-office-address-book",
  "vcalendar": "mime-vcalendar",
  "text-source": "mime-text-x-source",
  "text-x-source": "mime-text-x-source",
  "text-x-generic-template": "mime-text-x-generic-template",
  "text-css": "mime-text-css",
  "text-bibtex": "mime-text-x-bibtex",
  "text-x-bibtex": "mime-text-x-bibtex",
  "text-x-c++": "mime-text-x-c++",
  "text-x-c++hdr": "mime-text-x-c++hdr",
  "text-c": "mime-text-x-c",
  "text-x-c": "mime-text-x-c",
  "text-changelog": "mime-text-x-changelog",
  "text-x-changelog": "mime-text-x-changelog",
  "text-chdr": "mime-text-x-chdr",
  "text-x-chdr": "mime-text-x-chdr",
  "text-copying": "mime-text-x-copying",
  "text-x-copying": "mime-text-x-copying",
  "text-install": "mime-text-x-install",
  "text-x-install": "mime-text-x-install",
  "text-preview": "mime-text-x-preview",
  "text-x-preview": "mime-text-x-preview",
  "text-readme": "mime-text-x-readme",
  "text-x-readme": "mime-text-x-readme",
  "text-tex": "mime-text-x-tex",
  "text-x-tex": "mime-text-x-tex",
  "text-xhtml+xml": "mime-text-xhtml+xml",
  "x-dia-diagram": "mime-x-dia-diagram"
};

export function getMimeIcon(mime:string): string {
    if (MimeTypes[mime]) {
        return MimeTypes[mime].replace(/\+/m, 'p');
    }
    return MimeTypes['unknown'];
};