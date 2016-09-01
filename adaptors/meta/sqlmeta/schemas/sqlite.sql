

CREATE TABLE IF NOT EXISTS `file` (
    `id` integer PRIMARY KEY AUTOINCREMENT,
    `cid` binary(12) not null,
    `name` varchar(255) NOT NULL,
    `mime_type` varchar(50) NOT NULL DEFAULT 'application/octet-stream',
    `size` bigint NOT NULL,
    `uid` int(11) NOT NULL,
    `gid` int(11) NOT NULL DEFAULT 0,
    `perms` int DEFAULT '190' ,
    `ctime` datetime NOT NULL,
    `mtime` datetime NOT NULL,
    /*`status` enum('creating', 'active', 'inactive') NOT NULL default "creating",*/
    `status` varchar(20) NOT NULL DEFAULT 'creating',
    `sha1` binary(20) DEFAULT NULL,
);

CREATE INDEX IF NOT EXISTS resource_name_index ON resource(`name`);

CREATE TABLE IF NOT EXISTS `node` (
    `id` integer PRIMARY KEY AUTOINCREMENT,
    `dir` tinyint(1) NOT NULL default '0',
    `path` varchar(255) NOT NULL,
    `parent_id` int(11) DEFAULT NULL,
    `project_id`int(11) NOT NULL,
    `resource_id`int(11) DEFAULT NULL,
    FOREIGN KEY (`resource_id`) REFERENCES resource(`id`) ON DELETE cascade,
    FOREIGN KEY (`parent_id`) REFERENCES node(`id`) ON DELETE SET NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS node_index ON node(`path`, `project_id`);

