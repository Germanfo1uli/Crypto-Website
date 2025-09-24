package cryptoback.server.controllers;

import cryptoback.server.models.user.UserData;
import cryptoback.server.services.UserDataService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/users")
public class UserDataController {
    private final UserDataService userDataService;

    public UserDataController(UserDataService userDataService)
    {
        this.userDataService = userDataService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CompletableFuture<UserData> createUser(@RequestBody UserData userData)
    {
        return userDataService.createUserAsync(userData);
    }
}
