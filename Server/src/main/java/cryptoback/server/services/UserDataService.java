package cryptoback.server.services;

import jakarta.transaction.Transactional;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import cryptoback.server.repositories.UserDataRepository;
import cryptoback.server.models.user.UserData;

import java.util.concurrent.CompletableFuture;

@Service
public class UserDataService {
    private final UserDataRepository repository;

    public UserDataService(UserDataRepository repository) {
        this.repository = repository;
    }

    @Async
    @Transactional
    public CompletableFuture<UserData> createUserAsync(UserData user) {
        if (user.getUsername() == null || user.getUsername().isEmpty()) {
            throw new IllegalArgumentException("Username cannot be empty");
        }
        return CompletableFuture.completedFuture(repository.save(user));
    }
}
