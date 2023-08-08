export interface MsalToken {
    // {
    //     "token_type": "Bearer",
    //     "scope": "User.Read Notes.ReadWrite",
    //     "expires_in": 3600,
    //     "ext_expires_in": 3600,
    //     "access_token": "EwCQA8l6BAAUAOyDv0l6PcCVu89kmzvqZmkWABkAAYfjh7uqTUQlL56fi6fTQanZPsylQ67T7MyJLxFRk0wWTOyUtsWRchFpfMCFq/zAKyGBRlVUFHC2kLxEjJt7RGwXKIMhis0/NoC+WrX/tyJew5ADuGdCr7oUPQR96sUzFnisJH3duKYOSD3y6gHCOjwvRSfRe8d5YjpJgraLWhu9uRWAKAcMenDn62cbp8YAdp1gvH/0kkCXfHpx9Op2OgGFq0f6MbbV/jYwlJJiaE/M2L1eb03kKTKUuYQVH/IrAZtIzvR4TwNJoXPhCcZ+aee/vZa2iaKg8cPAdk8S4Wlj8NT4YBi/0zSKBtILSaIZXgwTPusXiCjq6VT7vUnK1n4DZgAACKbOhFjeCJMxYAL/IDFsRCG7DOpFZGSzQkueizfdyyLqVb+bV5G0Gshaxq9jtkhGh/qczln2qd9f6Kar5raG7r6l11fzcoUMGCtbufyef0WxldyX3r9jAIc3FZkMdfxaQt0mgoenRtA3Dn++nIND9d2SdAStA8xMuNZFJxDS2Twsc3xWE0sXEj2LSRrwJZjn11TuVScwfZggon7csQpjzs6CuB0KpKttRY5YIsFh0IIdXSznFa3WB1agD1AwSg749urXs7DJdh+sN9s5yWZNmf2Mv+ahrPwNh9l9UYisuq0a/mGqfhYhmBXGmpqtJgGNChnxed/pbdbvG1ewfVujceAAKR3h2mQOxr0WXzRjDa2/vGRTef6roaQsERnZoZd9/Sei2d97OtccXbyC+0I+S00bPIwBMFjWUW3qyHNZTzJla5Tgfhw+KLBJ83uQO7/i0s3XAnzL5xPu/u9q0sKh5hjB7YXkY0v8tli49Aw25JMQZSDjjjeLp1Nmm3sZNDChohknXIeZvLqXUc6IMhvjn7yeBJRV7zXTQiFDMfQNblIHdNrZByWdNUJnRPD7Y27j19XMllk8tTHt6gg6VLdMMpalzjAOGf3l4obV/e6eoPoGJ1g4GC1zUmhokap8b//eupkGYd8ZqEayWaikgBaiMIex2WP1NXqPSzCL+DFi2VMCz4706Ku0ah9yyoTp6M8CiJlWl85JjmqxuiWeDKT+tYMzXG/e1V4yoeA5XGgNS3rF2oTie5Cvy5GTH6HEHMsAfK7Dna9Vinpm6uLiD/IWjQZ2ipyLyQQG9Rkaou8RgoFga2GRtvL5C1J8v3kC",
    //     "refresh_token": "M.C107_BAY.-CSz0b!z0SYLwm!ilQGCLIlrMiENy0uCJqx!Yy46tn7oYrkajtDe4mvvQUn0G2HeNWWJDjOiaUOk49IPb7K*FQFPOtZcttyHF63t3yLJEg0dl1r12UysOGLh5Aao9ilKoA*5pd66ej5FoPBANXDetrsDGRL78DbYACxBU7mT6ySwxHqKK6Ae7yohYv9YesvA*wR3jQRSoOhX5ceLStNUh1hzAYHYKd5PhpI*9TDZyTc4H16Z5uuJFCbaVx8uVqgDwXBHX0vDSgGMJHI0!Bv11Q1qzAd4eQYgpVA4dvBsZMkVv2CgJ54dKSGu2hAWTB3oGX3yPy79nb0qw8nh6pT7MGXX0QIP4!g6iJjTKBkOVbtr!z!5KJ5T*NlT9uGChp9c5gmPU9JgprikvrBl15i3OUHgSJXpKFFvNNtvKS6vbHu7t"
    // }
    token_type: string;
    scope: string;
    expires_in: number;
    ext_expires_in: number;
    access_token: string;
    refresh_token: string;
}
