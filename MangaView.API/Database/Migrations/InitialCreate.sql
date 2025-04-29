-- ������� ������������
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Email NVARCHAR(255) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE()
);

-- ������� �����
CREATE TABLE Manga (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    CoverUrl NVARCHAR(500),
    Genres NVARCHAR(255),
    AverageRating FLOAT DEFAULT 0
);

-- ������� ����
CREATE TABLE Chapters (
    Id INT PRIMARY KEY IDENTITY(1,1),
    MangaId INT NOT NULL,
    ChapterNumber FLOAT NOT NULL,
    Title NVARCHAR(255),
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (MangaId) REFERENCES Manga(Id) ON DELETE CASCADE
);

-- ������� �������
CREATE TABLE Pages (
    Id INT PRIMARY KEY IDENTITY(1,1),
    ChapterId INT NOT NULL,
    PageNumber INT NOT NULL,
    ImageUrl NVARCHAR(500) NOT NULL,
    FOREIGN KEY (ChapterId) REFERENCES Chapters(Id) ON DELETE CASCADE
);

-- ������� ������
CREATE TABLE Ratings (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    MangaId INT NOT NULL,
    Score INT NOT NULL CHECK (Score BETWEEN 1 AND 10),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (MangaId) REFERENCES Manga(Id) ON DELETE CASCADE,
    CONSTRAINT UC_UserManga UNIQUE (UserId, MangaId) -- ��� 1 ���� 1 ��� ������ ���� �����
);

-- ������� ���������
CREATE TABLE Comments (
    Id INT PRIMARY KEY IDENTITY(1,1),
    UserId INT NOT NULL,
    MangaId INT NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (MangaId) REFERENCES Manga(Id) ON DELETE CASCADE
);
