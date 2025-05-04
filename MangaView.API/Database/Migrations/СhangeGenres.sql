CREATE TABLE Genres (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE MangaGenres (
    MangaId INT NOT NULL,
    GenreId INT NOT NULL,
    PRIMARY KEY (MangaId, GenreId),
    FOREIGN KEY (MangaId) REFERENCES Manga(Id) ON DELETE CASCADE,
    FOREIGN KEY (GenreId) REFERENCES Genres(Id) ON DELETE CASCADE
);

-- Вставка унікальних жанрів у таблицю Genres
INSERT INTO Genres (Name)
SELECT DISTINCT TRIM(value)
FROM Manga
CROSS APPLY STRING_SPLIT(Genres, ',');

-- Заповнення зв'язків Manga <-> Genre
INSERT INTO MangaGenres (MangaId, GenreId)
SELECT m.Id, g.Id
FROM Manga m
CROSS APPLY STRING_SPLIT(m.Genres, ',') AS split
JOIN Genres g ON TRIM(split.value) = g.Name;

ALTER TABLE Manga DROP COLUMN Genres;
