# Graph Report - siaraproperty  (2026-08-07)

## Corpus Check
- 137 files · ~551,424 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 738 nodes · 997 edges · 61 communities (37 shown, 24 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `519586b7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]

## God Nodes (most connected - your core abstractions)
1. `getAppUrl()` - 23 edges
2. `NavbarAd()` - 20 edges
3. `Sidebar()` - 15 edges
4. `SiderbarMob()` - 15 edges
5. `StickyNavbar()` - 8 edges
6. `db` - 7 edges
7. `scripts` - 7 edges
8. `scripts` - 5 edges
9. `useLenis()` - 5 edges
10. `HomePageNew()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Footer()` --calls--> `getAppUrl()`  [EXTRACTED]
  client/src/components/Footer.jsx → client/src/config/axios.js
- `PropertyType()` --calls--> `getAppUrl()`  [EXTRACTED]
  client/src/components/PropertyType.jsx → client/src/config/axios.js
- `SingleProperty()` --calls--> `getAppUrl()`  [EXTRACTED]
  client/src/components/SingleProperty.jsx → client/src/config/axios.js
- `AllProperties()` --calls--> `getAppUrl()`  [EXTRACTED]
  client/src/pages/AllProperties.jsx → client/src/config/axios.js
- `RentedProperties()` --calls--> `getAppUrl()`  [EXTRACTED]
  client/src/components/RentedProperties.jsx → client/src/config/axios.js

## Import Cycles
- None detected.

## Communities (61 total, 24 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (44): adminSlice, initialState, AddImages(), Container, AddProperty(), Container, Container, AllBlogs() (+36 more)

### Community 1 - "Community 1"
Cohesion: 0.03
Nodes (64): AreaCard, AreaDesc, AreaDivider, AreaEmoji, AreaIconWrap, AreaName, areas, AreasGrid (+56 more)

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (45): addProperty(), addSuggestedPropperty(), adminLoginController(), adminRegistration(), bcrypt, { db }, delete_Property(), deletePropertyImageById() (+37 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (45): browserslist, development, production, dependencies, axios, bootstrap, cogo-toast, eslint-config-react-app (+37 more)

### Community 4 - "Community 4"
Cohesion: 0.06
Nodes (31): useLenis(), HomePageNew(), useAllImages(), useSectionData(), Wrapper, SingleBlogDynamic(), Wrapper, Hero() (+23 more)

### Community 5 - "Community 5"
Cohesion: 0.05
Nodes (41): browserslist, development, production, dependencies, axios, bootstrap, @canvasjs/charts, @canvasjs/react-charts (+33 more)

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (37): BackButton, BgPattern, ContactInfoSide, ContactNote, DividerLine, ErrorText, Eyebrow, EyebrowLine (+29 more)

### Community 7 - "Community 7"
Cohesion: 0.09
Nodes (19): Banner(), Wrapper, CommercialProperty(), Wrapper, Luxuaryhouse(), Wrapper, MostViewed(), Wrapper (+11 more)

### Community 8 - "Community 8"
Cohesion: 0.13
Nodes (17): Container, Footer(), RentedProperties(), Wrapper, apiBaseUrl, getAppUrl(), About(), Container (+9 more)

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (22): author, dependencies, bcrypt, bcryptjs, cookie-parser, cors, dotenv, express (+14 more)

### Community 10 - "Community 10"
Cohesion: 0.11
Nodes (15): Container, PopularCategory(), AboutPageNew(), stats, team, testimonials, values, ContactPageNew() (+7 more)

### Community 11 - "Community 11"
Cohesion: 0.11
Nodes (18): adminForgotPassword(), adminResetPassword(), bcrypt, contactedUser(), { db }, deleteContactedUser(), deleteIntrestedUser(), deleteRegisteredUser() (+10 more)

### Community 12 - "Community 12"
Cohesion: 0.14
Nodes (12): StickyNavbar(), Wrapper, PropertyType(), Wrapper, Flats(), Wrapper, RentalProperty(), Wrapper (+4 more)

### Community 13 - "Community 13"
Cohesion: 0.13
Nodes (15): adminLoginController(), adminRegistration(), bcrypt, { db }, dotenv, express, JWT, mysql (+7 more)

### Community 14 - "Community 14"
Cohesion: 0.17
Nodes (11): addBlog(), { db }, deleteBlog(), dotenv, editBlog(), fs, getAllBlogs(), getBlogById() (+3 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (13): persistConfig, persistedReducer, persistor, rootReducer, store, NavbarMob(), Wrapper, MobileDrawer (+5 more)

### Community 16 - "Community 16"
Cohesion: 0.28
Nodes (6): ContactUsModel(), Container, RelatedProperty(), Wrapper, Container, SingleProperty()

### Community 17 - "Community 17"
Cohesion: 0.22
Nodes (6): baseUrl, fs, outputDir, path, publicDir, rootDir

### Community 18 - "Community 18"
Cohesion: 0.31
Nodes (5): ContactUsModel(), RelatedProperty(), Wrapper, Container, SideBlog()

### Community 19 - "Community 19"
Cohesion: 0.22
Nodes (8): blogStorage, blogUploadsDir, fs, multer, path, storage, upload, uploadBlog

### Community 20 - "Community 20"
Cohesion: 0.25
Nodes (6): { db }, dotenv, jwt, db, dotenv, mysql

### Community 21 - "Community 21"
Cohesion: 0.25
Nodes (7): app, cors, dotenv, express, morgen, path, propertyRouter

### Community 22 - "Community 22"
Cohesion: 0.05
Nodes (8): bcrypt, { db }, dotenv, express, fs, JWT, mysql, path

### Community 23 - "Community 23"
Cohesion: 0.33
Nodes (5): persistConfig, persistedReducer, persistor, rootReducer, store

### Community 24 - "Community 24"
Cohesion: 0.50
Nodes (4): dotenv, nodemailer, sendEmail(), sendEmailController()

### Community 59 - "Community 59"
Cohesion: 0.40
Nodes (4): Wrapper, SearchModel(), stringSimilarity, Wrapper

## Knowledge Gaps
- **391 isolated node(s):** `express`, `dotenv`, `cors`, `morgen`, `path` (+386 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `db` connect `Community 20` to `Community 2`, `Community 11`, `Community 13`, `Community 14`, `Community 22`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `getAppUrl()` connect `Community 8` to `Community 16`, `Community 12`, `Community 7`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._
- **What connects `express`, `dotenv`, `cors` to the rest of the system?**
  _391 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06693306693306693 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.03076923076923077 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0673758865248227 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.043478260869565216 - nodes in this community are weakly interconnected._