.. node-ngspice documentation master file, created by
   sphinx-quickstart on Sat May  5 00:26:49 2018.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

欢迎!
========================================


欢迎阅读该文档！在这里您会学到如何优雅地使用本仿真软件，以及一些应付日常使用 ``ngspice`` 的基础知识。也包含 ``node-ngspice`` 的基本原理，实现细节等，我们也十分期待您对这个工具的贡献，无论是在 `GitHub`_ 提出 ``ISSUE/PR`` ，亦或是帮助我们测试代码/编写文档教程，我们都不胜感激！当然，如果这个工具/教程确实帮到了你，请不要吝啬给我们一个 `Star`_

.. _GitHub: https://github.com/higuoxing/node-ngspice
.. _Star: https://github.com/Higuoxing/node-ngspice/stargazers

.. toctree::
   :maxdepth: 2
   :caption: Contents:

简介
========================================

========================================
1.1 关于SPICE
========================================

``SPICE`` 是一款用于电路仿真的软件，它的全称是 ``Simulation Program with Integrated Circuit Emphasis`` 。 ``SPICE`` 软件的来历可以追溯到1969年，一位来自 ``U.C. Berkeley`` 叫做 ``Ronald Rohrer`` 的教授把一个叫做 ``CANCER (Computer Analysis of Nonlinear Circuits, Excluding Radiation)`` 的项目当做了学生的课程设计，这便是 ``SPICE`` 的前身。其中有位学生名叫 ``Laurence W. Nagel``，他在课程结束后，把 ``CANCER`` 项目当做了他的硕士以及博士时期的课题，继续研究了下去。也许你已经发现了，``CANCER`` 恰恰是癌症的英语单词，这也就是当时 ``CANCER`` 没能在工业界广泛应用的主要原因，所以 ``Nagel`` 给他的程序重新起了一个名字 ``SPICE 1``， ``SPICE`` 诞生了！

以上历史来源于 ``Nagel`` 的有关 ``SPICE`` 起源的文章 `The-Origins-of-SPICE`_ ，有兴趣的读者可以自行阅读。

.. _The-Origins-of-SPICE: http://www.omega-enterprises.net/The%20Origins%20of%20SPICE.html


========================================
1.2 关于NGSPICE
========================================

`NGSPICE`_ 是一个根据三款开源软件 `Spice3f5`_, `Cider1b1`_ 以及 `Xspice`_ 编写出来的 ``SPICE`` 软件，现在仍在维护，并且有很大的可靠性。相比于昂贵的 ``hspice`` 等闭源软件，是一个十分理想的替代品。同时，很多优秀的开源 ``EDA`` 软件也以 ``NGSPICE`` 作为后端仿真软件，例如： `EAGLE`_ 、`easyEDA`_ 以及 `KiCAD`_ 等。当然，我们的 `node-ngspice`_ 也以 ``NGSPICE`` 作为后端软件。

以上介绍源于 `NGSPICE`_ 官方页面，里边也包含许多有用的资料比如 ``NGSPICE`` 手册/教程等等，有兴趣的读者可以自行查阅。

.. _NGSPICE: http://ngspice.sourceforge.net

.. _Spice3f5: http://embedded.eecs.berkeley.edu/pubs/downloads/spice

.. _Cider1b1: http://www-cad.eecs.berkeley.edu/Software/cider.html

.. _Xspice: http://users.ece.gatech.edu/~mrichard/Xspice

.. _EAGLE: https://www.autodesk.com/products/eagle/overview

.. _easyEDA: https://easyeda.com

.. _KiCAD: http://kicad-pcb.org

.. _node-ngspice: https://github.com/higuoxing/node-ngspice

========================================
1.3 关于node-ngspice
========================================

``node-ngspice`` 是我在大三时上 ``VLSI`` 课程时为 ``NGSPICE`` 随手写的一个网页前端。主要是因为 ``NGSPICE`` 自带的前端画图功能太过陈旧，不够美观，故重写了一个较好看的前端，最初只是给自己应付作业使用，后来发现大家比较认可，甚至 ``easyEDA`` 的一位核心开发者给我发了邮件鼓励我，我也十分开心，于是部署了这个前端项目，希望能给大家提供一点方便，做一点微小的工作。同时，编写了这个 ``wiki`` 页面，旨在帮助更多的初学者了解 ``SPICE`` 类软件的基本使用，为推广开源软件做一点微不足道的贡献。

如何使用
========================================



更多示例
========================================

相关资源
========================================
