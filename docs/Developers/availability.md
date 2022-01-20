---
title: Availability
sidebar_position: 5
---

Even if you are developing a parser or a tokenizer. It is strongly recommended that the source code of the tools be made available, as it is easier to access it, report bugs, promote collaboration between the different developers and empower Gura.

Regarding versioning, if your tool supports different versions of Gura, we recommend making available in the official documentation (either a website or README) a table indicating which versions of the library support which version of Gura. For example:


**Compatibility**

| **Parser version** | **Gura version** |
|--------------------|------------------|
| 1.x                | 1.0.0            |
| 2.0.x              | 2.0.0            |
| 2.1.x              | 2.0.1            |


This can also be accompanied by references to [Git branches][git-branches], [Git tags][git-tags], [Github releases][github-releases], or any other way to differentiate versions of your project that can be explicitly linked to a Gura version.


[git-branches]: https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell#ch03-git-branching
[git-tags]: https://git-scm.com/book/en/v2/Git-Basics-Tagging
[github-releases]: https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases
