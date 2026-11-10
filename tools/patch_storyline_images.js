const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = 'E:/SteamLibrary/steamapps/common/\u6C5F\u5C71\u5317\u671B/resources/extracted_app';

// 1. Patch main.js
const mainPath = path.join(baseDir, 'main.js');
let mainContent = fs.readFileSync(mainPath, 'utf8');

const oldAppEntry = `var appEntry = async (request) => {
	try {
		const u = new URL(request.url);
		if (u.host !== "main_window") return new Response(null, { status: 404 });
		const pathname = u.pathname === "/" ? "/index.html" : decodeURIComponent(u.pathname);
		const rendererRoot = path$1.resolve(import.meta.dirname, "renderer", MAIN_WINDOW_VITE_NAME$1);
		const relativePathname = pathname.replace(/^\\/+/, "");
		const pathToServe = path$1.resolve(rendererRoot, relativePathname);
		const relativePath = path$1.relative(rendererRoot, pathToServe);
		if (!(relativePath.length > 0 && !relativePath.startsWith("..") && !path$1.isAbsolute(relativePath))) return new Response(null, { status: 404 });
		return await net.fetch(pathToFileURL(pathToServe).toString());
	} catch (err) {
		console.error("[AppProtocol] Error serving app resource:", err);
		return new Response(null, { status: 404 });
	}
};`;

const newAppEntry = `var appEntry = async (request) => {
	try {
		const u = new URL(request.url);
		if (u.host !== "main_window") return new Response(null, { status: 404 });
		const pathname = u.pathname === "/" ? "/index.html" : decodeURIComponent(u.pathname);
		const rendererRoot = path$1.resolve(import.meta.dirname, "renderer", MAIN_WINDOW_VITE_NAME$1);
		const relativePathname = pathname.replace(/^\\/+/, "");
		const pathToServe = path$1.resolve(rendererRoot, relativePathname);
		const relativePath = path$1.relative(rendererRoot, pathToServe);
		if (!(relativePath.length > 0 && !relativePath.startsWith("..") && !path$1.isAbsolute(relativePath))) return new Response(null, { status: 404 });
		try {
			const res = await net.fetch(pathToFileURL(pathToServe).toString());
			if (res.ok) return res;
		} catch (fetchErr) {}
		let targetFile = pathToServe;
		if (!fs.existsSync(targetFile)) {
			const rawRelative = u.pathname.replace(/^\\/+/, "");
			const alt1 = path$1.resolve(rendererRoot, rawRelative);
			const alt2 = path$1.resolve(rendererRoot, encodeURIComponent(relativePathname));
			if (fs.existsSync(alt1)) targetFile = alt1;
			else if (fs.existsSync(alt2)) targetFile = alt2;
		}
		if (fs.existsSync(targetFile)) {
			const data = fs.readFileSync(targetFile);
			const mime = lookup(targetFile) || "application/octet-stream";
			const fullMime = mime.startsWith("text/") ? mime + "; charset=utf-8" : mime;
			return new Response(data, {
				headers: {
					"Content-Type": fullMime,
					"Content-Length": "" + data.length
				},
				status: 200
			});
		}
		return new Response(null, { status: 404 });
	} catch (err) {
		console.error("[AppProtocol] Error serving app resource:", err);
		return new Response(null, { status: 404 });
	}
};`;

if (!mainContent.includes(oldAppEntry)) {
  console.error('ERROR: oldAppEntry not found in main.js');
} else {
  mainContent = mainContent.replace(oldAppEntry, newAppEntry);
  fs.writeFileSync(mainPath, mainContent, 'utf8');
  console.log('main.js patched successfully!');
}

// 2. Patch StorylineView-D_jd21fC.js
const modernStorylinePath = path.join(baseDir, 'renderer/main_window/assets/StorylineView-D_jd21fC.js');
let modernStoryline = fs.readFileSync(modernStorylinePath, 'utf8');
const modernTarget = 'new URL(`点-D4Z2mVCy.svg`,import.meta.url)';
const modernReplace = 'new URL(`dot-D4Z2mVCy.svg`,import.meta.url)';

if (!modernStoryline.includes(modernTarget)) {
  console.error('ERROR: modernTarget not found in StorylineView-D_jd21fC.js');
} else {
  modernStoryline = modernStoryline.replace(modernTarget, modernReplace);
  fs.writeFileSync(modernStorylinePath, modernStoryline, 'utf8');
  console.log('StorylineView-D_jd21fC.js patched successfully!');
}

// 3. Patch StorylineView-legacy-BQUEwMNi.js
const legacyStorylinePath = path.join(baseDir, 'renderer/main_window/assets/StorylineView-legacy-BQUEwMNi.js');
let legacyStoryline = fs.readFileSync(legacyStorylinePath, 'utf8');
const legacyTarget = 'new URL("点-D4Z2mVCy.svg",t.meta.url)';
const legacyReplace = 'new URL("dot-D4Z2mVCy.svg",t.meta.url)';

if (!legacyStoryline.includes(legacyTarget)) {
  console.error('ERROR: legacyTarget not found in StorylineView-legacy-BQUEwMNi.js');
} else {
  legacyStoryline = legacyStoryline.replace(legacyTarget, legacyReplace);
  fs.writeFileSync(legacyStorylinePath, legacyStoryline, 'utf8');
  console.log('StorylineView-legacy-BQUEwMNi.js patched successfully!');
}

// 4. Verify AST on modified files
const filesToVerify = [
  'main.js',
  'renderer/main_window/assets/StorylineView-D_jd21fC.js',
  'renderer/main_window/assets/StorylineView-legacy-BQUEwMNi.js'
];

for (const rel of filesToVerify) {
  const p = path.join(baseDir, rel);
  const code = fs.readFileSync(p, 'utf8');
  try {
    new vm.SourceTextModule(code);
    console.log(`AST OK: ${rel}`);
  } catch (e) {
    console.error(`AST ERROR in ${rel}:`, e.message);
  }
}
